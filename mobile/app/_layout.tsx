// app/_layout.tsx
import { Slot } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import SafeScreen from "@/components/SafeScreen";
import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'


import "./global.css";

export default function RootLayout() {
  useEffect(() => {
    const setupFullscreen = async () => {
      if (Platform.OS === "android") {
        try {
          await NavigationBar.setVisibilityAsync("hidden");
        } catch (error) {
          console.log("Error:", error);
        }
      }
    };

    setupFullscreen();
  }, []);

  return (
    <>
      <StatusBar style="auto" translucent />
      <ClerkProvider tokenCache={tokenCache}>
     <SafeScreen>
        <Slot />
     </SafeScreen>
     </ClerkProvider>
    </>
  );
}