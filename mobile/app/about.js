import { View, Text, ScrollView } from 'react-native';

export default function About() {
  return (
    <ScrollView className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-bold mb-4">
        About Opportunity Radar
      </Text>

      <Text className="text-base mb-3">
        Opportunity Radar is a platform designed to help individuals discover the right opportunities at the right time. Whether you are a student, a fresher, or someone exploring career growth, our goal is to simplify your journey by bringing all relevant opportunities into one place.
      </Text>

      <Text className="text-base mb-3">
        We focus on both tech and non-tech sectors, ensuring that users from diverse backgrounds can find something valuable. From internships and job openings to skill-building resources and career insights, Opportunity Radar acts as your personal guide in navigating the ever-changing world of opportunities.
      </Text>

      <Text className="text-base mb-3">
        Our mission is to make opportunity discovery simple, organized, and accessible. We understand how overwhelming it can be to search across multiple platforms, so we aim to provide curated and easy-to-understand information that saves your time and effort.
      </Text>

      <Text className="text-base mb-3">
        Opportunity Radar was created with the vision of empowering individuals to make informed decisions about their future. We believe that the right opportunity, when discovered at the right time, can truly change lives.
      </Text>

      <Text className="text-base font-semibold mt-4 mb-3">
        Start exploring today and take a step closer to your goals with Opportunity Radar.
      </Text>
    </ScrollView>
  );
}