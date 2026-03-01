import { Stack } from 'expo-router';

export default function MockInterviewLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6366f1',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Mock Interview',
          headerShown: true 
        }} 
      />
      <Stack.Screen 
        name="session" 
        options={{ 
          title: 'Interview Session',
          headerBackTitle: 'Back'
        }} 
      />
      <Stack.Screen 
        name="results" 
        options={{ 
          title: 'Results',
          headerLeft: () => null, // Prevent going back
        }} 
      />
    </Stack>
  );
}