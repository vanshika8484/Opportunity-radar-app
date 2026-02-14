// app/_layout.tsx
import { Slot } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import SafeScreen from "@/components/SafeScreen";
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
      <SafeScreen>
        <Slot />
      </SafeScreen>
    </>
  );
}