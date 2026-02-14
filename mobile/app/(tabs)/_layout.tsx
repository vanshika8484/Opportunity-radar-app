import { Redirect, Stack, Tabs } from "expo-router";

import { Ionicons } from "@expo/vector-icons";


export default function TabLayout() {
    // const {isSignedIn} = useAuth();
    // if(!isSignedIn) {
    //     return <Redirect href="/(auth)/sign-in" />
    // }
  return (
    <Tabs screenOptions={{headerShown: false,
      tabBarStyle: {
        borderTopWidth:1,
        height:60,
        paddingBottom:8,
        paddingTop:8,
        bottom:0,
        borderColor:"#e0e0e0"
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: "600",
      },
      
    }}> 
      <Tabs.Screen name="index" options={{title: "Home",tabBarIcon:({color,size})=><Ionicons name="home" size={size} color={color} />}} />
      <Tabs.Screen name="search" options={{title: "Search",tabBarIcon:({color,size})=><Ionicons name="search" size={size} color={color} />}} />
      <Tabs.Screen name="dashboard" options={{title: "Dashboard",tabBarIcon:({color,size})=><Ionicons name="stats-chart" size={size} color={color} />}} />
      <Tabs.Screen name="saved" options={{title: "Saved",tabBarIcon:({color,size})=><Ionicons name="bookmark" size={size} color={color} />}} />
    </Tabs>
  );
}