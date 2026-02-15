
import React from "react";
import { Text, View, Pressable, Linking } from "react-native";
import Svg, { Path, Circle, Rect } from 'react-native-svg';

const Footer = () => {
  const openURL = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
  };

  return (
    <View className="bg-gray-900 border-t border-gray-800">
      <View className="px-5 py-5  mx-auto">
        {/* Logo and Title */}
        <View className="flex-row items-center justify-center">
          <View className="h-10 w-10 bg-indigo-500 rounded-full items-center justify-center">
            <Text className="text-white font-bold text-sm">OR</Text>
          </View>
          <Text className="ml-3 text-xl font-bold text-indigo-200">
            Opportunity Radar
          </Text>
        </View>

        {/* Copyright */}
        <Text className="text-sm text-gray-500 text-center mb-2">
          © 2025 Opportunity Radar —{' '}
          <Text 
            className="text-gray-400"
            onPress={() => openURL('https://twitter.com/opportunityradar')}
          >
            @opportunityradar
          </Text>
        </Text>

        {/* Social Media Icons */}
        <View className="flex-row justify-center gap-6">
          {/* Facebook */}
          <Pressable 
            onPress={() => openURL('https://facebook.com')}
            style={({ pressed }) => ({
              opacity: pressed ? 0.6 : 1,
              transform: [{ scale: pressed ? 0.9 : 1 }],
            })}
          >
            <Svg width={20} height={20} fill="#9ca3af" viewBox="0 0 24 24">
              <Path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </Svg>
          </Pressable>

          {/* Twitter */}
          <Pressable 
            onPress={() => openURL('https://twitter.com/opportunityradar')}
            style={({ pressed }) => ({
              opacity: pressed ? 0.6 : 1,
              transform: [{ scale: pressed ? 0.9 : 1 }],
            })}
          >
            <Svg width={20} height={20} fill="#9ca3af" viewBox="0 0 24 24">
              <Path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </Svg>
          </Pressable>

          {/* Instagram */}
          <Pressable 
            onPress={() => openURL('https://instagram.com')}
            style={({ pressed }) => ({
              opacity: pressed ? 0.6 : 1,
              transform: [{ scale: pressed ? 0.9 : 1 }],
            })}
          >
            <Svg
              width={20}
              height={20}
              fill="none"
              stroke="#9ca3af"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <Rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <Path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
            </Svg>
          </Pressable>

          {/* LinkedIn */}
          <Pressable 
            onPress={() => openURL('https://linkedin.com')}
            style={({ pressed }) => ({
              opacity: pressed ? 0.6 : 1,
              transform: [{ scale: pressed ? 0.9 : 1 }],
            })}
          >
            <Svg width={20} height={20} fill="#9ca3af" viewBox="0 0 24 24">
              <Path
                stroke="none"
                d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
              />
              <Circle cx="4" cy="4" r="2" stroke="none" />
            </Svg>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Footer;