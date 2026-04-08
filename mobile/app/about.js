// import { View, Text, ScrollView } from 'react-native';

// export default function About() {
//   return (
//     <ScrollView className="flex-1 p-4 bg-white">
//       <Text className="text-2xl font-bold mb-4">
//         About Opportunity Radar
//       </Text>

//       <Text className="text-base mb-3">
//         Opportunity Radar is a platform designed to help individuals discover the right opportunities at the right time. Whether you are a student, a fresher, or someone exploring career growth, our goal is to simplify your journey by bringing all relevant opportunities into one place.
//       </Text>

//       <Text className="text-base mb-3">
//         We focus on both tech and non-tech sectors, ensuring that users from diverse backgrounds can find something valuable. From internships and job openings to skill-building resources and career insights, Opportunity Radar acts as your personal guide in navigating the ever-changing world of opportunities.
//       </Text>

//       <Text className="text-base mb-3">
//         Our mission is to make opportunity discovery simple, organized, and accessible. We understand how overwhelming it can be to search across multiple platforms, so we aim to provide curated and easy-to-understand information that saves your time and effort.
//       </Text>

//       <Text className="text-base mb-3">
//         Opportunity Radar was created with the vision of empowering individuals to make informed decisions about their future. We believe that the right opportunity, when discovered at the right time, can truly change lives.
//       </Text>

//       <Text className="text-base font-semibold mt-4 mb-3">
//         Start exploring today and take a step closer to your goals with Opportunity Radar.
//       </Text>
//     </ScrollView>
//   );
// }
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function About() {
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Ionicons name="compass" size={48} color="#fff" />
        </View>
        <Text style={styles.headerTitle}>
          About Opportunity Radar
        </Text>
        <View style={styles.headerLine} />
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        {/* Main Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.cardIcon, { backgroundColor: '#dbeafe' }]}>
              <Ionicons name="information-circle" size={24} color="#2563eb" />
            </View>
            <Text style={styles.cardTitle}>Who We Are</Text>
          </View>
          <Text style={styles.cardText}>
            Opportunity Radar is a platform designed to help individuals discover the right opportunities at the right time. Whether you are a student, a fresher, or someone exploring career growth, our goal is to simplify your journey by bringing all relevant opportunities into one place.
          </Text>
        </View>

        {/* Focus Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.cardIcon, { backgroundColor: '#dcfce7' }]}>
              <Ionicons name="layers" size={24} color="#16a34a" />
            </View>
            <Text style={styles.cardTitle}>Our Focus</Text>
          </View>
          <Text style={styles.cardText}>
            We focus on both tech and non-tech sectors, ensuring that users from diverse backgrounds can find something valuable. From internships and job openings to skill-building resources and career insights, Opportunity Radar acts as your personal guide in navigating the ever-changing world of opportunities.
          </Text>
        </View>

        {/* Mission Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.cardIcon, { backgroundColor: '#f3e8ff' }]}>
              <Ionicons name="rocket" size={24} color="#9333ea" />
            </View>
            <Text style={styles.cardTitle}>Our Mission</Text>
          </View>
          <Text style={styles.cardText}>
            Our mission is to make opportunity discovery simple, organized, and accessible. We understand how overwhelming it can be to search across multiple platforms, so we aim to provide curated and easy-to-understand information that saves your time and effort.
          </Text>
        </View>

        {/* Vision Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.cardIcon, { backgroundColor: '#fef3c7' }]}>
              <Ionicons name="eye" size={24} color="#d97706" />
            </View>
            <Text style={styles.cardTitle}>Our Vision</Text>
          </View>
          <Text style={styles.cardText}>
            Opportunity Radar was created with the vision of empowering individuals to make informed decisions about their future. We believe that the right opportunity, when discovered at the right time, can truly change lives.
          </Text>
        </View>

        {/* CTA Card */}
        <View style={styles.ctaCard}>
          <Ionicons name="sparkles" size={32} color="#fff" />
          <Text style={styles.ctaText}>
            Start exploring today and take a step closer to your goals with Opportunity Radar.
          </Text>
        </View>

        {/* Features Grid */}
        <Text style={styles.featuresTitle}>What We Offer</Text>
        <View style={styles.featuresGrid}>
          {[
            { icon: 'briefcase', label: 'Job Listings', color: '#2563eb', bg: '#eff6ff' },
            { icon: 'school', label: 'Internships', color: '#16a34a', bg: '#f0fdf4' },
            { icon: 'bulb', label: 'Skill Building', color: '#9333ea', bg: '#faf5ff' },
            { icon: 'trending-up', label: 'Career Insights', color: '#d97706', bg: '#fffbeb' },
          ].map((item, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: item.bg }]}>
                <Ionicons name={item.icon} size={24} color={item.color} />
              </View>
              <Text style={styles.featureLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#2563eb',
    paddingTop: 50,
    paddingBottom: 70,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 16,
    borderRadius: 50,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  headerLine: {
    backgroundColor: 'rgba(255,255,255,0.4)',
    height: 4,
    width: 60,
    borderRadius: 2,
    marginTop: 12,
  },
  content: {
    paddingHorizontal: 20,
    marginTop: -35,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  cardIcon: {
    padding: 10,
    borderRadius: 50,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  cardText: {
    fontSize: 15,
    color: '#4b5563',
    lineHeight: 24,
  },
  ctaCard: {
    backgroundColor: '#2563eb',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 24,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 16,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  featureIcon: {
    padding: 12,
    borderRadius: 50,
    marginBottom: 10,
  },
  featureLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
  },
});