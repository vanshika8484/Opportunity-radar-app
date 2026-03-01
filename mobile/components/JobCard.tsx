import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

interface JobCardProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    salary?: string;
    type?: string;
  };
  onRemove?: () => void;
  isSaved?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, onRemove, isSaved }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.jobInfo}>
          <Text style={styles.jobTitle}>{job.title}</Text>
          <Text style={styles.company}>{job.company}</Text>
        </View>
        {isSaved && onRemove && (
          <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
            <Ionicons name="bookmark" size={24} color="#000" />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.jobDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="location-outline" size={16} color="#000" />
          <Text style={styles.detailText}>{job.location}</Text>
        </View>
        
        {job.type && (
          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={16} color="#000" />
            <Text style={styles.detailText}>{job.type}</Text>
          </View>
        )}
        
        {job.salary && (
          <View style={styles.detailRow}>
            <Ionicons name="cash-outline" size={16} color="#000" />
            <Text style={styles.detailText}>{job.salary}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#000",
    marginBottom: 4,
  },
  company: {
    fontSize: 14,
    color: "#000",
  },
  removeButton: {
    padding: 4,
  },
  jobDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: "#000",
  },
});

export default JobCard;