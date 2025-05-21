import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { api } from '@/services/api';
import { User, UserProfile } from '@/types';
import { router } from 'expo-router';

interface AuthContextData {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Storage implementation that works on both web and native
const storage = {
  async getItem(key: string): Promise<string | null> {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    }
    return SecureStore.getItemAsync(key);
  },

  async setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  },

  async removeItem(key: string): Promise<void> {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      try {
        const storageUser = await storage.getItem('user');
        const storageToken = await storage.getItem('token');

        if (storageUser && storageToken) {
          api.defaults.headers.common['Authorization'] = `Bearer ${storageToken}`;
          setUser(JSON.parse(storageUser));
          router.replace('/(app)/pointages');
        }
      } catch (error) {
        console.error('Error loading storage data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadStorageData();
  }, []);

  async function signIn(email: string, password: string) {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const userData: User = {
        id: '1',
        email: email,
        fullName: 'John Doe',
        photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
        cin: '09876543',
        region: 'Tunis',
        weight: 75,
        height: 180,
        hasDrivingLicense: true,
        hasVehicle: false,
      };
      
      const token = 'mock-jwt-token';
      
      await storage.setItem('user', JSON.stringify(userData));
      await storage.setItem('token', token);
      
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(userData);
      router.replace('/(app)/pointages');
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  }

  async function signOut() {
    try {
      await storage.removeItem('user');
      await storage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
      router.replace('/');
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }

  async function updateProfile(profile: Partial<UserProfile>) {
    try {
      if (!user) throw new Error('User not authenticated');
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const updatedUser = { ...user, ...profile };
      
      await storage.setItem('user', JSON.stringify(updatedUser));
      
      setUser(updatedUser);
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}