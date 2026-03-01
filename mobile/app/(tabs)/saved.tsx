// import { View, Text, ScrollView, FlatList, TouchableOpacity, Alert } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { useClerk, useUser } from '@clerk/clerk-expo'
// import { savedStyles } from "../../assets/styles/saved.styles"
// import LoadingSpinner from '../../components/LoadingSpinner'
// import NoSavedJobsFound from '../../components/NoSavedJobsFound'
// import { API_URL } from "../../constants/api"
// import { Ionicons } from '@expo/vector-icons'
// import JobCard from '../../components/JobCard'

// const Saved = () => {
// interface SavedJob {
//   id: string;
//   jobId: string;
//   title: string;
//   company: string;
//   location: string;
//   salary?: string;
//   type?: string;
// }
//   const { signOut } = useClerk();
//   const { user } = useUser();
//   const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadSavedJobs = async () => {
//       try {
//         const response = await fetch(`${API_URL}/favorites`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch saved jobs');
//         }
//         const saved = await response.json();
        
//         // Transform the data to match the JobCard component's expected format
//         const transformedSaved = saved.map((job: any) => ({
//           ...job,
//           id: job.jobId
//         }));
        
//         setSavedJobs(transformedSaved);
//       } catch (error) {
//         console.log('Error loading saved jobs:', error);
//         Alert.alert('Error', 'Failed to load saved jobs');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (user?.id) {
//       loadSavedJobs();
//     }
//   }, [user?.id]);

//   const handleSignOut = () => {
//     Alert.alert("Logout", "Are you sure you want to logout?", [
//       { text: "Cancel", style: "cancel" },
//       { text: "Logout", style: "destructive", onPress:()=> signOut() },
//     ]);
//   };

//   const handleRemoveJob = async (jobId: string) => {
//     Alert.alert(
//       "Remove Job",
//       "Are you sure you want to remove this job from saved?",
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Remove",
//           style: "destructive",
//           onPress: async () => {
//             try {
//               const response = await fetch(`${API_URL}/favorites/${user?.id}/${jobId}`, {
//                 method: 'DELETE',
//               });
              
//               if (response.ok) {
//                 setSavedJobs(prev => prev.filter(job => job.id !== jobId));
//               }
//             } catch (error) {
//               console.log('Error removing job:', error);
//               Alert.alert('Error', 'Failed to remove job');
//             }
//           }
//         },
//       ]
//     );
//   };

//   const refreshSavedJobs = () => {
//     setLoading(true);
//   };

//   if (loading) {
//     return <LoadingSpinner message="Loading your saved jobs..." />
//   }

//   return (
//     <View style={savedStyles.container}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <View style={savedStyles.header}>
//           <View>
//             <Text style={savedStyles.title}>Saved Jobs</Text>
//             <Text style={savedStyles.subtitle}>
//               {savedJobs.length} {savedJobs.length === 1 ? 'job' : 'jobs'} saved
//             </Text>
//           </View>
//           <TouchableOpacity style={savedStyles.logoutButton} onPress={handleSignOut}>
//             <Ionicons name="log-out-outline" size={22} color="#000" />
//           </TouchableOpacity>
//         </View>

//         <View style={savedStyles.jobsSection}>
//           <FlatList
//             data={savedJobs}
//             renderItem={({ item }) => (
//               <JobCard 
//                 job={item} 
//                 onRemove={() => handleRemoveJob(item.id)}
//                 isSaved={true}
//               />
//             )}
//             keyExtractor={(item) => item.id.toString()}
//             contentContainerStyle={savedStyles.jobsList}
//             scrollEnabled={false}
//             ListEmptyComponent={<NoSavedJobsFound />}
//             showsVerticalScrollIndicator={false}
//           />
//         </View>
//       </ScrollView>
//     </View>
//   )
// }

// export default Saved

// app/(tabs)/saved.tsx
import { View, Text, ScrollView, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { useClerk, useUser } from '@clerk/clerk-expo';
import { savedStyles } from "../../assets/styles/saved.styles";
import LoadingSpinner from '../../components/LoadingSpinner';
import NoSavedJobsFound from '../../components/NoSavedJobsFound';
import { API_URL } from "../../constants/api";
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

// Your backend only stores: name, email, jobTitle
interface SavedJob {
  id?: number;
  name: string;
  email: string;
  jobTitle: string;
}

const Saved = () => {
  const { signOut } = useClerk();
  const { user } = useUser();
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [loading, setLoading] = useState(true);

  // Get user info
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
      console.log('Saved jobs from API:', saved);
      
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

  // Reload when tab comes into focus
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
              // Your backend DELETE uses name and email
              const response = await fetch(
                `${API_URL}/favorites/${encodeURIComponent(userName)}/${encodeURIComponent(userEmail)}`,
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
    <View style={savedStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={savedStyles.header}>
          <View>
            <Text style={savedStyles.title}>Saved Jobs</Text>
            <Text style={savedStyles.subtitle}>
              {savedJobs.length} {savedJobs.length === 1 ? 'job' : 'jobs'} saved
            </Text>
          </View>
          <TouchableOpacity style={savedStyles.logoutButton} onPress={handleSignOut}>
            <Ionicons name="log-out-outline" size={22} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={savedStyles.jobsSection}>
          {savedJobs.length === 0 ? (
            <NoSavedJobsFound />
          ) : (
            <FlatList
              data={savedJobs}
              renderItem={({ item }) => (
                <View style={jobCardStyles.card}>
                  <View style={jobCardStyles.header}>
                    <Text style={jobCardStyles.title}>{item.jobTitle}</Text>
                    <TouchableOpacity onPress={() => handleRemoveJob(item.jobTitle)}>
                      <Ionicons name="bookmark" size={24} color="#2b45b9ff" />
                    </TouchableOpacity>
                  </View>
                  <Text style={jobCardStyles.info}>Saved by: {item.name}</Text>
                </View>
              )}
              keyExtractor={(item, index) => `${item.jobTitle}-${index}`}
              contentContainerStyle={savedStyles.jobsList}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

// Simple inline styles for job card (since backend only has jobTitle)
const jobCardStyles = {
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  info: {
    fontSize: 14,
    color: '#666',
  },
};

export default Saved;