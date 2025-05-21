import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';
import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { SplashScreen } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { AuthProvider } from '@/contexts/AuthContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { useAuth } from '@/contexts/AuthContext';
import { Bell, CircleUser } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { router } from 'expo-router';

SplashScreen.preventAutoHideAsync();

function HeaderRight() {
  const { user } = useAuth();

  return (
    <View style={styles.headerRight}>
      <TouchableOpacity 
        style={styles.iconButton}
        onPress={() => router.push('/notifications')}
      >
        <Bell size={24} color={Colors.text.primary} />
        <View style={styles.notificationBadge}>
          <Text style={styles.badgeText}>3</Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.profileButton}
        onPress={() => router.push('/profile')}
      >
        {user?.photo ? (
          <Image 
            source={{ uri: user.photo }} 
            style={styles.profileImage}
          />
        ) : (
          <CircleUser size={24} color={Colors.text.primary} />
        )}
      </TouchableOpacity>
    </View>
  );
}

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-Bold': Inter_700Bold,
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-Medium': Poppins_500Medium,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Poppins-Bold': Poppins_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <AuthProvider>
        <NotificationProvider>
          <Stack 
            screenOptions={{
              headerStyle: {
                backgroundColor: Colors.background.paper,
              },
              headerTitleStyle: {
                fontFamily: 'Poppins-SemiBold',
                fontSize: 18,
                color: Colors.text.primary,
              },
              headerRight: () => <HeaderRight />,
              headerShadowVisible: false,
            }}
          >
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen 
              name="(app)" 
              options={{ 
                headerShown: true,
                title: 'OPS APP',
              }} 
            />
            <Stack.Screen 
              name="notifications" 
              options={{ 
                presentation: 'modal',
                title: 'Notifications',
              }} 
            />
            <Stack.Screen 
              name="profile" 
              options={{ 
                presentation: 'modal',
                title: 'Mon Profil',
              }} 
            />
            <Stack.Screen name="+not-found" options={{ title: 'Page non trouvée' }} />
          </Stack>
          <StatusBar style="auto" />
        </NotificationProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 16,
    gap: 16,
  },
  iconButton: {
    position: 'relative',
    padding: 4,
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.error.main,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.background.paper,
  },
  badgeText: {
    color: Colors.common.white,
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  profileButton: {
    padding: 4,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
});