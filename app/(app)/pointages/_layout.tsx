import { Stack } from 'expo-router';
import Colors from '@/constants/Colors';

export default function PointageLayout() {
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
          title: 'Mes Pointages',
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="nouveau" 
        options={{ 
          title: 'Nouveau Pointage',
          presentation: 'modal', 
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="details" 
        options={{ 
          title: 'Détails du Pointage',
          headerShown: true, 
        }} 
      />
    </Stack>
  );
}