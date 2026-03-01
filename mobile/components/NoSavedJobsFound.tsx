import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const NoSavedJobsFound = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="bookmark-outline" size={80} color="#000" />
      <Text style={styles.title}>No Saved Jobs Yet</Text>
      <Text style={styles.subtitle}>
        Start saving jobs you're interested in to view them here
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#000",
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#000",
    textAlign: 'center',
  },
});

export default NoSavedJobsFound;