
import { View, Text, ScrollView, FlatList, TouchableOpacity, Alert, StyleSheet, Linking } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { useClerk, useUser } from '@clerk/clerk-expo';
import LoadingSpinner from '../../components/LoadingSpinner';
import NoSavedJobsFound from '../../components/NoSavedJobsFound';
import { API_URL } from "../../constants/api";
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

interface SavedJob {
  id?: number;
  name: string;
  email: string;
  jobTitle: string;
    jobUrl?: string; 
    company?: string; 
  location?: string;  

}

const Saved = () => {
  const { signOut } = useClerk();
  const { user } = useUser();
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [loading, setLoading] = useState(true);

  const userName = user?.fullName || user?.firstName || 'User';
  const userEmail = user?.primaryEmailAddress?.emailAddress || '';

  const loadSavedJobs = useCallback(async () => {
    if (!user?.id || !userEmail) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${API_URL}/favorites/${encodeURIComponent(userName)}/${encodeURIComponent(userEmail)}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch saved jobs');
      }
      
      const saved = await response.json();
      setSavedJobs(saved);
    } catch (error) {
      console.log('Error loading saved jobs:', error);
      Alert.alert('Error', 'Failed to load saved jobs');
    } finally {
      setLoading(false);
    }
  }, [user?.id, userEmail, userName]);

  useEffect(() => {
    loadSavedJobs();
  }, [loadSavedJobs]);

  useFocusEffect(
    useCallback(() => {
      loadSavedJobs();
    }, [loadSavedJobs])
  );

  const handleSignOut = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: () => signOut() },
    ]);
  };

  const handleRemoveJob = async (jobTitle: string) => {
    Alert.alert(
      "Remove Job",
      "Are you sure you want to remove this job from saved?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            try {
            const response = await fetch(
  `${API_URL}/favorites/${encodeURIComponent(userName)}/${encodeURIComponent(userEmail)}/${encodeURIComponent(jobTitle)}`,
  { method: 'DELETE' }
);
              if (response.ok) {
                setSavedJobs(prev => prev.filter(job => job.jobTitle !== jobTitle));
                Alert.alert('Success', 'Job removed from saved');
              } else {
                throw new Error('Failed to delete');
              }
            } catch (error) {
              console.log('Error removing job:', error);
              Alert.alert('Error', 'Failed to remove job');
            }
          }
        },
      ]
    );
  };

  if (loading) {
    return <LoadingSpinner message="Loading your saved jobs..." />;
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Saved Jobs</Text>
            <Text style={styles.subtitle}>
              {savedJobs.length} {savedJobs.length === 1 ? 'job' : 'jobs'} saved
            </Text>
          </View>
          
          {/* Sign Out Button with Icon and Text */}
          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <Ionicons name="log-out-outline" size={18} color="#fff" />
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        {/* Jobs Section */}
        <View style={styles.jobsSection}>
          {savedJobs.length === 0 ? (
            <NoSavedJobsFound />
          ) : (
            <FlatList
              data={savedJobs}
              renderItem={({ item, index }) => (
                <View style={[styles.jobCard, index === 0 && { marginTop: 0 }]}>
                  {/* Left Accent Bar */}
                  <View style={styles.accentBar} />
                  
                  <View style={styles.jobContent}>
                    <View style={styles.jobHeader}>
                      {/* Job Icon */}
                      <View style={styles.jobIconContainer}>
                        <Ionicons name="briefcase" size={18} color="#fff" />
                      </View>
                      
                      {/* Job Title */}
                      <Text style={styles.jobTitle} numberOfLines={2}>
                        {item.jobTitle}
                      </Text>
                      
                      {/* Bookmark Button */}
                      <TouchableOpacity 
                        style={styles.bookmarkButton}
                        onPress={() => handleRemoveJob(item.jobTitle)}
                      >
                        <Ionicons name="bookmark" size={24} color="#667eea" />
                      </TouchableOpacity>
                    </View>
                    
                    {item.company && (
  <View style={styles.info} >
          <Text style={styles.jobLabel}>Company:</Text>
    <Text style={styles.infoText}>{item.company}</Text>
  </View>
)}
{item.location && (
  <View style={styles.info}>
          <Text style={styles.jobLabel}>Location:</Text>
    <Text style={styles.infoText}>{item.location}</Text>
  </View>
)}
                    {item.jobUrl ? (
  <View style={styles.infoRow}>
    <TouchableOpacity
    style={styles.applyButton}
    onPress={() =>
      Linking.openURL(item.jobUrl!).catch(err =>
        console.error('Failed to open URL:', err)
      )
    }
  >
    <Ionicons name="open-outline" size={14} color="#fff" />
    <Text style={styles.applyButtonText}>Apply Now</Text>
  </TouchableOpacity>
  </View>
) : null}
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => `${item.jobTitle}-${index}`}
              contentContainerStyle={styles.jobsList}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4ff',
  },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 25,
    backgroundColor: '#667eea',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  
  // Sign Out Button
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e74c3c',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 25,
    shadowColor: '#e74c3c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  signOutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  
  // Jobs Section
  jobsSection: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 20,
  },
  jobsList: {
    paddingBottom: 20,
  },
  
  // Job Card
  jobCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginTop: 15,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  applyButton: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#667eea',
  paddingHorizontal: 14,
  paddingVertical: 8,
  alignSelf: 'flex-start',
  marginTop: 10,
  borderRadius: 5,
  gap: 6,
},
applyButtonText: {
  color: '#fff',
  fontSize: 13,
  fontWeight: '600',
},
  accentBar: {
    width: 5,
    backgroundColor: '#667eea',
  },
  jobContent: {
    flex: 1,
    padding: 16,
  },
  jobHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  jobIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  jobTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#2d3748',
    lineHeight: 22,
    marginRight: 8,
  },
    jobLabel: {
    fontWeight: 'bold',
    color: '#333',
  },
  bookmarkButton: {
    padding: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  info:{
 flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    paddingTop: 2,
   
  },
  infoText: {
    fontSize: 13,
    color: '#718096',
    marginLeft: 8,
    fontWeight: '500',
  },
});

export default Saved;