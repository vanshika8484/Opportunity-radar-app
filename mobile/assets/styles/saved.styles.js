import { StyleSheet } from 'react-native';

export const savedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#000',
    marginTop: 4,
  },
  logoutButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  jobsSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  jobsList: {
    paddingBottom: 20,
  },
});