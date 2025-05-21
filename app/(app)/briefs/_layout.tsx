import { Stack } from 'expo-router';
import Colors from '@/constants/Colors';

export default function BriefsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.background.paper,
        },
        headerTintColor: Colors.text.primary,
        headerTitleStyle: {
          fontFamily: 'Poppins-SemiBold',
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Briefs',
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="details" 
        options={{ 
          title: 'Détails du brief',
          headerShown: true, 
        }} 
      />
    </Stack>
  );
}