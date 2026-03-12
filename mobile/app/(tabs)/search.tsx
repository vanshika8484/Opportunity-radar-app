
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Linking,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Alert,
  ImageSourcePropType,
  ListRenderItem,
  Switch,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';
import { API_URL } from '../../constants/api';

// --- TYPE DEFINITIONS ---
interface NormalizedJob {
  id: string | number;
  title: string;
  company: string;
  location: string;
  url: string;
}

interface DisplayJob extends NormalizedJob {
  platformName: string;
  logoUrl: string | ImageSourcePropType;
  isLocalImage: boolean;
  isSaved?: boolean;
  relevanceScore?: number;
}

interface Platform {
  name: string;
  logoUrl: string | ImageSourcePropType;
  isLocalImage?: boolean;
  getHeaders: () => Record<string, string>;
  buildApiUrl: (what: string, where: string) => string;
  getJobsFromResult: (data: any) => any[];
  normalizeFunction: (job: any) => NormalizedJob;
}

interface PlatformsConfig {
  [key: string]: Platform;
}

interface FilterOptions {
  strictMatch: boolean;
  minRelevanceScore: number;
}

// --- CONFIGURATION ---
const JSEARCH_API_KEY = '89b382883emshcc0b0cd30db5786p11bf3cjsnfd425adf5d8a';

const remotiveLogo: ImageSourcePropType = require('../../assets/images/joblogo.png');

const platforms: PlatformsConfig = {
  jsearch: {
    name: 'JSearch Aggregator',
    logoUrl: 'https://rapidapi.com/favicon.ico',
    getHeaders: () => ({
      'x-rapidapi-host': 'jsearch.p.rapidapi.com',
      'x-rapidapi-key': JSEARCH_API_KEY,
    }),
    buildApiUrl: (what: string, where: string): string =>
      `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(
        `${what} in ${where || 'India'}`
      )}`,
    getJobsFromResult: (data: any): any[] => data.data || [],
    normalizeFunction: (job: any): NormalizedJob => ({
      id: job.job_id,
      title: job.job_title || 'N/A',
      company: job.employer_name || 'N/A',
      location:
        `${job.job_city || ''} ${job.job_state || ''}, ${job.job_country || ''}`.trim() || 'N/A',
      url: job.job_apply_link || '',
    }),
  },
  adzuna: {
    name: 'Adzuna',
    logoUrl: 'https://www.adzuna.com/favicon.ico',
    getHeaders: () => ({}),
    buildApiUrl: (what: string, where: string): string =>
      `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=6e69ff78&app_key=fdbc7ad08011390576e3fbf79df49481&results_per_page=20&what=${what}&where=${where}`,
    getJobsFromResult: (data: any): any[] => data.results || [],
    normalizeFunction: (job: any): NormalizedJob => ({
      id: job.id,
      title: job.title || 'N/A',
      company: job.company?.display_name || 'N/A',
      location: job.location?.display_name || 'N/A',
      url: job.redirect_url || '',
    }),
  },
  theMuse: {
    name: 'The Muse',
    logoUrl: 'https://www.themuse.com/favicon.ico',
    getHeaders: () => ({}),
    buildApiUrl: (what: string, where: string): string =>
      `https://www.themuse.com/api/public/jobs?page=1&location=${encodeURIComponent(
        where || 'India'
      )}`,
    getJobsFromResult: (data: any): any[] => data.results || [],
    normalizeFunction: (job: any): NormalizedJob => ({
      id: job.id,
      title: job.name || 'N/A',
      company: job.company?.name || 'N/A',
      location:
        job.locations?.map((loc: { name: string }) => loc.name).join(', ') || 'N/A',
      url: job.refs?.landing_page || '',
    }),
  },
  remotive: {
    name: 'Remotive (Remote)',
    logoUrl: remotiveLogo,
    isLocalImage: true,
    getHeaders: () => ({}),
    buildApiUrl: (what: string, _where: string): string =>
      `https://remotive.com/api/remote-jobs?search=${what}`,
    getJobsFromResult: (data: any): any[] => data.jobs || [],
    normalizeFunction: (job: any): NormalizedJob => ({
      id: job.id,
      title: job.title || 'N/A',
      company: job.company_name || 'N/A',
      location: `Remote (${job.candidate_required_location || 'Worldwide'})`,
      url: job.url || '',
    }),
  },
};


const calculateRelevanceScore = (
  jobTitle: string,
  searchTerms: string[],
  jobType: string
): number => {
  const titleLower = jobTitle.toLowerCase();
  let score = 0;

  // Check each search term
  searchTerms.forEach((term) => {
    const termLower = term.toLowerCase();
    
    // Exact word match (highest score)
    const wordBoundaryRegex = new RegExp(`\\b${termLower}\\b`, 'i');
    if (wordBoundaryRegex.test(titleLower)) {
      score += 30;
    }
    // Partial match (lower score)
    else if (titleLower.includes(termLower)) {
      score += 15;
    }
    // Similar word match (even lower)
    else if (checkSimilarWords(titleLower, termLower)) {
      score += 10;
    }
  });

  // Bonus for job type match
  if (jobType && titleLower.includes(jobType.toLowerCase())) {
    score += 20;
  }

  // Bonus if title starts with a search term
  searchTerms.forEach((term) => {
    if (titleLower.startsWith(term.toLowerCase())) {
      score += 10;
    }
  });

  return score;
};

/**
 * Check for similar/related words
 */
const checkSimilarWords = (title: string, searchTerm: string): boolean => {
  const synonyms: Record<string, string[]> = {
    'engineer': ['developer', 'dev', 'programmer', 'coder'],
    'developer': ['engineer', 'dev', 'programmer', 'coder'],
    'software': ['swe', 'sde', 'application'],
    'frontend': ['front-end', 'front end', 'ui', 'react', 'angular', 'vue'],
    'backend': ['back-end', 'back end', 'server', 'api', 'node', 'python', 'java'],
    'fullstack': ['full-stack', 'full stack'],
    'senior': ['sr', 'lead', 'principal'],
    'junior': ['jr', 'entry', 'associate'],
    'manager': ['mgr', 'lead', 'head'],
    'data': ['analytics', 'ml', 'machine learning', 'ai'],
    'devops': ['sre', 'infrastructure', 'platform'],
    'mobile': ['ios', 'android', 'react native', 'flutter'],
  };

  const relatedTerms = synonyms[searchTerm] || [];
  return relatedTerms.some((related) => title.includes(related));
};

/**
 * Filter jobs based on search criteria
 */
const filterJobs = (
  jobs: DisplayJob[],
  searchQuery: string,
  location: string,
  jobType: string,
  filterOptions: FilterOptions
): DisplayJob[] => {
  // Extract search terms (split by space, remove common words)
  const stopWords = ['the', 'a', 'an', 'in', 'on', 'at', 'for', 'and', 'or', 'of'];
  const searchTerms = searchQuery
    .toLowerCase()
    .split(/\s+/)
    .filter((term) => term.length > 1 && !stopWords.includes(term));

  if (searchTerms.length === 0) {
    return jobs;
  }

  // Calculate relevance scores
  const scoredJobs = jobs.map((job) => ({
    ...job,
    relevanceScore: calculateRelevanceScore(job.title, searchTerms, jobType),
  }));

  // Filter by minimum relevance score
  let filteredJobs = scoredJobs.filter(
    (job) => job.relevanceScore >= filterOptions.minRelevanceScore
  );

  // Strict match: require ALL search terms to be present
  if (filterOptions.strictMatch) {
    filteredJobs = filteredJobs.filter((job) => {
      const titleLower = job.title.toLowerCase();
      return searchTerms.every(
        (term) =>
          titleLower.includes(term) || checkSimilarWords(titleLower, term)
      );
    });
  }

  // Filter by location if specified
  if (location.trim()) {
    const locationLower = location.toLowerCase();
    filteredJobs = filteredJobs.filter((job) => {
      const jobLocationLower = job.location.toLowerCase();
      return (
        jobLocationLower.includes(locationLower) ||
        locationLower === 'remote' && jobLocationLower.includes('remote')
      );
    });
  }

  // Sort by relevance score (highest first)
  filteredJobs.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));

  return filteredJobs;
};

const JobSearch: React.FC = () => {
  const { user } = useUser();
  const [whatQuery, setWhatQuery] = useState<string>('');
  const [whereQuery, setWhereQuery] = useState<string>('');
  const [jobType, setJobType] = useState<string>('');
  const [jobs, setJobs] = useState<DisplayJob[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<DisplayJob[]>([]);
  const [savedJobTitles, setSavedJobTitles] = useState<Set<string>>(new Set());
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Filter options
  const [strictMatch, setStrictMatch] = useState<boolean>(false);
  const [minRelevanceScore, setMinRelevanceScore] = useState<number>(15);

  const isInitialLoadDone = useRef<boolean>(false);
  const savedJobTitlesRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    savedJobTitlesRef.current = savedJobTitles;
  }, [savedJobTitles]);

  const userName = user?.fullName || user?.firstName || 'User';
  const userEmail = user?.primaryEmailAddress?.emailAddress || '';

  // Apply filters whenever jobs or filter settings change
  useEffect(() => {
    if (jobs.length > 0 && whatQuery.trim()) {
      const finalSearchTerm = jobType ? `${jobType} ${whatQuery}` : whatQuery;
      const filtered = filterJobs(jobs, finalSearchTerm, whereQuery, jobType, {
        strictMatch,
        minRelevanceScore,
      });
      setFilteredJobs(filtered);
      setStatusMessage(
        `Showing ${filtered.length} of ${jobs.length} jobs`
      );
    } else {
      setFilteredJobs(jobs);
    }
  }, [jobs, whatQuery, whereQuery, jobType, strictMatch, minRelevanceScore]);

  // Fetch saved job titles
  const fetchSavedJobTitles = async (): Promise<Set<string>> => {
    if (!user?.id || !userEmail) return new Set();

    try {
      const response = await fetch(
        `${API_URL}/favorites/${encodeURIComponent(userName)}/${encodeURIComponent(userEmail)}`
      );
      
      if (response.ok) {
        const savedJobs = await response.json();
        const titles = new Set(savedJobs.map((job: any) => job.jobTitle)) as Set<string>;
        return titles;
      }
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
    }
    return new Set();
  };

  // Fetch jobs function
  const fetchJobs = useCallback(
    async (what: string, where: string, savedTitles?: Set<string>): Promise<void> => {
      if (!what.trim()) {
        setStatusMessage("Please enter what you're looking for.");
        return;
      }
      setStatusMessage(`Fetching jobs for "${what}"...`);
      setJobs([]);
      setFilteredJobs([]);
      setIsLoading(true);

      const currentSavedTitles = savedTitles || savedJobTitlesRef.current;

      const fetchPromises = Object.values(platforms).map((platform: Platform) => {
        const headers = platform.getHeaders ? platform.getHeaders() : {};
        return fetch(platform.buildApiUrl(what, where), { headers })
          .then((response: Response) => {
            if (!response.ok)
              throw new Error(`Failed to fetch from ${platform.name}`);
            return response.json();
          })
          .then((data: any) => {
            const jobsData = platform.getJobsFromResult(data) || [];
            return jobsData.map((job: any): DisplayJob => {
              const normalizedJob = platform.normalizeFunction(job);
              return {
                ...normalizedJob,
                platformName: platform.name,
                logoUrl: platform.logoUrl,
                isLocalImage: platform.isLocalImage || false,
                isSaved: currentSavedTitles.has(normalizedJob.title),
              };
            });
          })
          .catch((error: Error) => {
            console.error(`Error with ${platform.name}:`, error);
            return [] as DisplayJob[];
          });
      });

      const results = await Promise.all(fetchPromises);
      const allJobs: DisplayJob[] = results.flat();

      setIsLoading(false);

      if (allJobs.length === 0) {
        setStatusMessage('No jobs found. Try a different search!');
      } else {
        setJobs(allJobs);
        setStatusMessage(`Fetched ${allJobs.length} jobs. Filtering...`);
      }
    },
    []
  );

  // Initial load
  useEffect(() => {
    const initializeData = async () => {
      if (isInitialLoadDone.current) return;
      isInitialLoadDone.current = true;

      const savedTitles = await fetchSavedJobTitles();
      setSavedJobTitles(savedTitles);
      savedJobTitlesRef.current = savedTitles;

      await fetchJobs('developer', 'remote', savedTitles);
    };

    initializeData();
  }, [user?.id, fetchJobs]);

  const handleSearchSubmit = (): void => {
    const finalSearchTerm = jobType ? `${jobType} ${whatQuery}` : whatQuery;
    fetchJobs(finalSearchTerm, whereQuery);
  };

  const handleApplyPress = (url: string): void => {
    if (url) {
      Linking.openURL(url).catch((err: Error) =>
        console.error('Failed to open URL:', err)
      );
    }
  };

  const handleToggleSave = async (job: DisplayJob): Promise<void> => {
    if (!user?.id) {
      Alert.alert('Login Required', 'Please login to save jobs');
      return;
    }

    if (!userEmail) {
      Alert.alert('Error', 'User email not found');
      return;
    }

    const isSaved = savedJobTitles.has(job.title);
    const method = isSaved ? 'DELETE' : 'POST';
    
    const endpoint = isSaved
      ? `${API_URL}/favorites/${encodeURIComponent(userName)}/${encodeURIComponent(userEmail)}/${encodeURIComponent(job.title)}`
      : `${API_URL}/favorites`;

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: method === 'POST'
          ? JSON.stringify({
              name: userName,
              email: userEmail,
              jobTitle: job.title,
              jobUrl: job.url,
              company: job.company,
              location: job.location,
            })
          : undefined,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      const newSavedTitles = new Set(savedJobTitles);
      if (isSaved) {
        newSavedTitles.delete(job.title);
      } else {
        newSavedTitles.add(job.title);
      }
      setSavedJobTitles(newSavedTitles);
      savedJobTitlesRef.current = newSavedTitles;

      setJobs((prevJobs) =>
        prevJobs.map((j) =>
          j.id === job.id ? { ...j, isSaved: !isSaved } : j
        )
      );

      Alert.alert(
        'Success',
        isSaved ? 'Job removed from saved' : 'Job saved successfully'
      );
    } catch (error) {
      console.error('Error toggling save:', error);
      Alert.alert('Error', 'Failed to save job. Please try again.');
    }
  };

  const renderJobItem: ListRenderItem<DisplayJob> = ({ item: job }) => (
    <View style={styles.jobCard}>
      <View style={styles.jobContent}>
        <View style={styles.jobHeader}>
          <View style={styles.titleContainer}>
            <Text style={styles.jobTitle}>{job.title}</Text>
            {job.relevanceScore !== undefined && job.relevanceScore > 0 && (
              <View style={styles.relevanceBadge}>
                <Text style={styles.relevanceText}>
                  {job.relevanceScore >= 50 ? '⭐ Best Match' : 
                   job.relevanceScore >= 30 ? '✓ Good Match' : 'Related'}
                </Text>
              </View>
            )}
          </View>
          <TouchableOpacity
            onPress={() => handleToggleSave(job)}
            style={styles.saveButton}
          >
            <Ionicons
              name={job.isSaved ? 'bookmark' : 'bookmark-outline'}
              size={24}
              color={job.isSaved ? '#2b45b9ff' : '#666'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.jobInfoRow}>
          <Text style={styles.jobLabel}>Company: </Text>
          <Text style={styles.jobValue}>{job.company}</Text>
        </View>
        <View style={styles.jobInfoRow}>
          <Text style={styles.jobLabel}>Location: </Text>
          <Text style={styles.jobValue}>{job.location}</Text>
        </View>
      </View>

      <View style={styles.jobFooter}>
        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => handleApplyPress(job.url)}
        >
          <Text style={styles.applyButtonText}>Apply Now</Text>
        </TouchableOpacity>

        <View style={styles.platformLogo}>
          {job.isLocalImage ? (
            <Image
              source={job.logoUrl as ImageSourcePropType}
              style={styles.logoImage}
            />
          ) : (
            <Image
              source={{ uri: job.logoUrl as string }}
              style={styles.logoImage}
            />
          )}
        </View>
      </View>
    </View>
  );

  const renderEmptyComponent = (): React.ReactElement | null => {
    if (!isLoading && filteredJobs.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Ionicons name="search-outline" size={48} color="#888" />
          <Text style={styles.emptyText}>No jobs match your criteria</Text>
          <Text style={styles.emptySubtext}>
            Try adjusting your search or turn off strict matching
          </Text>
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <TextInput
            style={styles.input}
            placeholder="What? (e.g., Software Engineer)"
            placeholderTextColor="#888"
            value={whatQuery}
            onChangeText={setWhatQuery}
          />

          <TextInput
            style={styles.input}
            placeholder="Where? (e.g., Bangalore, Remote)"
            placeholderTextColor="#888"
            value={whereQuery}
            onChangeText={setWhereQuery}
          />

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={jobType}
              onValueChange={(itemValue: string) => setJobType(itemValue)}
              style={styles.picker}
              dropdownIconColor="#333"
            >
              <Picker.Item label="Select Type" value="" />
              <Picker.Item label="Full-time" value="Full-time" />
              <Picker.Item label="Part-time" value="Part-time" />
              <Picker.Item label="Internship" value="Internship" />
              <Picker.Item label="Contract" value="Contract" />
              <Picker.Item label="Freelance" value="Freelance" />
              <Picker.Item label="Remote" value="Remote" />
            </Picker>
          </View>
          <TouchableOpacity style={styles.searchButton} onPress={handleSearchSubmit}>
            <Ionicons name="search" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.searchButtonText}>Search Jobs</Text>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={styles.title}>Job Listings</Text>

        {/* Status Message */}
        <Text style={styles.statusMessage}>{statusMessage}</Text>

        {/* Loading Indicator */}
        {isLoading && (
          <ActivityIndicator size="large" color="#106120ff" style={styles.loader} />
        )}

        {/* Job Listings */}
        <FlatList<DisplayJob>
          data={filteredJobs}
          renderItem={renderJobItem}
          keyExtractor={(item: DisplayJob, index: number) =>
            `${item.id}-${index}`
          }
          contentContainerStyle={styles.jobsContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyComponent}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#9cbbeeff',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  searchBar: {
    backgroundColor: '#7b83f3ff',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 12,
    color: '#333',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 12,
    overflow: 'hidden',
  },
  picker: {
    height: 55,
    color: '#333',
  },
  filterToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    marginBottom: 8,
  },
  filterToggleText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 14,
  },
  filterOptions: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  filterLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  filterHint: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  relevanceButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  relevanceButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    marginHorizontal: 2,
    alignItems: 'center',
  },
  relevanceButtonActive: {
    backgroundColor: '#fff',
  },
  relevanceButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  relevanceButtonTextActive: {
    color: '#2b45b9ff',
  },
  searchButton: {
    backgroundColor: '#2b45b9ff',
    padding: 12,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  statusMessage: {
    textAlign: 'center',
    fontSize: 16,
    paddingVertical: 10,
    paddingBottom: 15,
    color: '#555',
  },
  loader: {
    marginVertical: 20,
  },
  jobsContainer: {
    paddingBottom: 20,
  },
  jobCard: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  jobContent: {
    marginBottom: 15,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  titleContainer: {
    flex: 1,
    marginRight: 10,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  relevanceBadge: {
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: '#e8f5e9',
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  relevanceText: {
    fontSize: 11,
    color: '#2e7d32',
    fontWeight: '500',
  },
  saveButton: {
    padding: 4,
  },
  jobInfoRow: {
    flexDirection: 'row',
    marginBottom: 5,
    flexWrap: 'wrap',
  },
  jobLabel: {
    fontWeight: 'bold',
    color: '#333',
  },
  jobValue: {
    color: '#555',
    flex: 1,
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  applyButton: {
    backgroundColor: '#2b45b9ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  platformLogo: {
    opacity: 0.7,
  },
  logoImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    textAlign: 'center',
    color: '#555',
    fontSize: 16,
    marginTop: 12,
    fontWeight: '600',
  },
  emptySubtext: {
    textAlign: 'center',
    color: '#888',
    fontSize: 14,
    marginTop: 4,
  },
});

export default JobSearch;