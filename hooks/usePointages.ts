import { useState, useCallback } from 'react';
import { Pointage, PointageSubmission } from '@/types';
import { api } from '@/services/api';
import { useNotifications } from '@/contexts/NotificationContext';

// Mock data for development
const mockPointages: Pointage[] = [
  {
    id: 1,
    photo: 'https://images.pexels.com/photos/3965548/pexels-photo-3965548.jpeg',
    latitude: 36.8188,
    longitude: 10.1657,
    timestamp: '2025-08-10T09:30:00Z',
    status: 'validé',
    feedback: null,
  },
  {
    id: 2,
    photo: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg',
    latitude: 36.8223,
    longitude: 10.1547,
    timestamp: '2025-08-09T14:15:00Z',
    status: 'rejeté',
    feedback: 'La photo n\'est pas assez claire, veuillez reprendre.',
  },
  {
    id: 3,
    photo: 'https://images.pexels.com/photos/1431305/pexels-photo-1431305.jpeg',
    latitude: 36.8404,
    longitude: 10.1712,
    timestamp: '2025-08-08T11:45:00Z',
    status: 'en attente',
    feedback: null,
  },
];

export function usePointages() {
  const [pointages, setPointages] = useState<Pointage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { sendLocalNotification } = useNotifications();

  const loadPointages = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // In real app, fetch from API
      // const response = await api.get('/pointages');
      // setPointages(response.data);
      
      // Using mock data for now
      await new Promise(resolve => setTimeout(resolve, 1000)); // simulate network request
      setPointages(mockPointages);
    } catch (err) {
      console.error('Error loading pointages:', err);
      setError('Impossible de charger les pointages');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getPointageById = useCallback(async (id: string | number) => {
    try {
      // In real app, fetch specific pointage from API
      // const response = await api.get(`/pointages/${id}`);
      // return response.data;
      
      // Using mock data for now
      await new Promise(resolve => setTimeout(resolve, 500)); // simulate network request
      const pointage = mockPointages.find(p => p.id === Number(id));
      
      if (!pointage) {
        throw new Error('Pointage not found');
      }
      
      return pointage;
    } catch (err) {
      console.error('Error getting pointage by ID:', err);
      throw err;
    }
  }, []);

  const addPointage = useCallback(async (submission: PointageSubmission) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // In real app, post to API
      // const response = await api.post('/pointages', submission);
      // const newPointage = response.data;
      
      // Using mock response for now
      await new Promise(resolve => setTimeout(resolve, 1500)); // simulate network request
      const newPointage: Pointage = {
        id: Date.now(),
        photo: submission.photo,
        latitude: submission.latitude,
        longitude: submission.longitude,
        timestamp: submission.timestamp,
        status: 'en attente',
        feedback: null,
      };
      
      setPointages(prev => [newPointage, ...prev]);
      
      // Send a notification
      sendLocalNotification(
        'Pointage envoyé',
        'Votre pointage a été envoyé avec succès et est en cours de validation.'
      );
      
      return newPointage;
    } catch (err) {
      console.error('Error adding pointage:', err);
      setError('Impossible d\'ajouter le pointage');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [sendLocalNotification]);

  return {
    pointages,
    isLoading,
    error,
    loadPointages,
    getPointageById,
    addPointage,
  };
}