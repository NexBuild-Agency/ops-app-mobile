import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { Redirect } from 'expo-router';
import Colors from '@/constants/Colors';
import { CalendarRange, CircleCheck, Store, Store as ShoppingStore, BookOpen } from 'lucide-react-native';

export default function AppLayout() {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return null;
  }

  if (!user) {
    return <Redirect href="/" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary.main,
        tabBarInactiveTintColor: Colors.grey[500],
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="evenements"
        options={{
          title: 'Événements',
          tabBarIcon: ({ color, size }) => (
            <CalendarRange size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="pointages"
        options={{
          title: 'Pointages',
          tabBarIcon: ({ color, size }) => (
            <CircleCheck size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Carte',
          tabBarIcon: ({ color, size }) => (
            <Store size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="stocks"
        options={{
          title: 'Stocks',
          tabBarIcon: ({ color, size }) => (
            <ShoppingStore size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="briefs"
        options={{
          title: 'Briefs',
          tabBarIcon: ({ color, size }) => (
            <BookOpen size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.background.paper,
    borderTopColor: Colors.divider,
    height: 60,
    paddingBottom: 5,
    paddingTop: 5,
    elevation: 8,
    shadowColor: Colors.grey[900],
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabBarLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
});