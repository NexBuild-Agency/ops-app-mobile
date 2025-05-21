import { Stack } from 'expo-router';
import Colors from '@/constants/Colors';

export default function EvenementsLayout() {
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
          title: 'Événements',
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="details" 
        options={{ 
          title: 'Détails de l\'événement',
          headerShown: true, 
        }} 
      />
      <Stack.Screen 
        name="candidatures" 
        options={{ 
          title: 'Mes Candidatures',
          headerShown: true, 
        }} 
      />
    </Stack>
  );
}