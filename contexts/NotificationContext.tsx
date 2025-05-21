import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import * as Notifications from 'expo-notifications';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

interface NotificationContextData {
  notificationsEnabled: boolean;
  toggleNotifications: () => Promise<void>;
  sendLocalNotification: (title: string, body: string) => Promise<void>;
}

const NotificationContext = createContext<NotificationContextData>({} as NotificationContextData);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Helper functions for web storage
const webStorage = {
  getItem: async (key: string): Promise<string | null> => {
    return localStorage.getItem(key);
  },
  setItem: async (key: string, value: string): Promise<void> => {
    localStorage.setItem(key, value);
  },
};

// Platform-specific storage
const storage = Platform.OS === 'web' ? webStorage : SecureStore;

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    async function loadNotificationSetting() {
      try {
        const enabled = await storage.getItem('notificationsEnabled');
        setNotificationsEnabled(enabled === 'true');
      } catch (error) {
        console.error('Error loading notification settings:', error);
        // Default to false on error
        setNotificationsEnabled(false);
      }
    }

    async function registerForPushNotifications() {
      if (Platform.OS === 'web') return;
      
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus === 'granted') {
        const token = await Notifications.getExpoPushTokenAsync({
          projectId: "your-project-id",
        });
        console.log('Expo push token:', token);
      }
    }

    loadNotificationSetting();
    registerForPushNotifications();
  }, []);

  async function toggleNotifications() {
    try {
      const newState = !notificationsEnabled;
      await storage.setItem('notificationsEnabled', String(newState));
      setNotificationsEnabled(newState);
      
      if (newState && Platform.OS !== 'web') {
        // Request permission again if turning on
        await Notifications.requestPermissionsAsync();
      }
    } catch (error) {
      console.error('Error toggling notifications:', error);
    }
  }

  async function sendLocalNotification(title: string, body: string) {
    if (!notificationsEnabled || Platform.OS === 'web') return;
    
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
        },
        trigger: null, // Immediately
      });
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }

  return (
    <NotificationContext.Provider value={{ 
      notificationsEnabled, 
      toggleNotifications,
      sendLocalNotification,
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export function useNotifications() {
  const context = useContext(NotificationContext);
  
  if (!context) {
    throw new Error('useNotifications must be used within an NotificationProvider');
  }
  
  return context;
}