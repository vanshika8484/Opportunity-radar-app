// src/screens/JobSearch.tsx
import React, { useState, useEffect, useCallback } from 'react';
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
  StatusBar,
  ImageSourcePropType,
  ListRenderItem,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

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

// --- CONFIGURATION ---
const JSEARCH_API_KEY = '89b382883emshcc0b0cd30db5786p11bf3cjsnfd425adf5d8a';

// For local images, use require
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

const JobSearch: React.FC = () => {
  const [whatQuery, setWhatQuery] = useState<string>('');
  const [whereQuery, setWhereQuery] = useState<string>('');
  const [jobType, setJobType] = useState<string>('');
  const [jobs, setJobs] = useState<DisplayJob[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchJobs = useCallback(async (what: string, where: string): Promise<void> => {
    if (!what.trim()) {
      setStatusMessage("Please enter what you're looking for.");
      return;
    }
    setStatusMessage(`Fetching jobs for "${what}"...`);
    setJobs([]);
    setIsLoading(true);

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
          return jobsData.map((job: any): DisplayJob => ({
            ...platform.normalizeFunction(job),
            platformName: platform.name,
            logoUrl: platform.logoUrl,
            isLocalImage: platform.isLocalImage || false,
          }));
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
      const shuffledJobs = allJobs.sort(() => 0.5 - Math.random());
      setJobs(shuffledJobs);
      setStatusMessage(`Showing ${shuffledJobs.length} combined results...`);
    }
  }, []);

  useEffect(() => {
    fetchJobs('developer', 'remote');
  }, [fetchJobs]);

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

  const renderJobItem: ListRenderItem<DisplayJob> = ({ item: job }) => (
    <View style={styles.jobCard}>
      <View style={styles.jobContent}>
        <Text style={styles.jobTitle}>{job.title}</Text>
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
    if (!isLoading && jobs.length === 0) {
      return <Text style={styles.emptyText}>No jobs to display</Text>;
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="#9cbbeeff" /> */}
      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <TextInput
            style={styles.input}
            placeholder="What? (e.g., Engineer)"
            placeholderTextColor="#888"
            value={whatQuery}
            onChangeText={setWhatQuery}
          />

          <TextInput
            style={styles.input}
            placeholder="Where? (e.g., Bangalore)"
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
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={styles.title}>Job Listings...</Text>

        {/* Status Message */}
        <Text style={styles.statusMessage}>{statusMessage}</Text>

        {/* Loading Indicator */}
        {isLoading && (
          <ActivityIndicator size="large" color="#106120ff" style={styles.loader} />
        )}

        {/* Job Listings */}
        <FlatList<DisplayJob>
          data={jobs}
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
    shadowOffset: {
      width: 0,
      height: 4,
    },
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
  searchButton: {
    backgroundColor: '#2b45b9ff',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
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
    paddingBottom:15,
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  jobContent: {
    marginBottom: 15,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
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
    backgroundColor:'#2b45b9ff',
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
  emptyText: {
    textAlign: 'center',
    color: '#555',
    fontSize: 16,
    marginTop: 20,
  },
});

export default JobSearch;