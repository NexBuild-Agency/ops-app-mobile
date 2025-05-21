import { useState, useCallback } from 'react';
import { Lieu } from '@/types';

// Mock data for development
const mockLieux: Lieu[] = [
  {
    id: 1,
    name: 'Carrefour La Marsa',
    address: 'Av. Habib Bourguiba, La Marsa 2070',
    region: 'Tunis Nord',
    latitude: 36.8893,
    longitude: 10.3229,
  },
  {
    id: 2,
    name: 'Monoprix Centre Ville',
    address: 'Av. Habib Bourguiba, Tunis 1000',
    region: 'Tunis Centre',
    latitude: 36.7988,
    longitude: 10.1804,
  },
  {
    id: 3,
    name: 'Géant Tunis City',
    address: 'Route de La Marsa, Les Berges du Lac 1053',
    region: 'Tunis Nord',
    latitude: 36.8422,
    longitude: 10.2644,
  },
  {
    id: 4,
    name: 'Carrefour Market Sousse',
    address: 'Av. Mohamed V, Sousse 4000',
    region: 'Sousse',
    latitude: 35.8245,
    longitude: 10.6408,
  },
  {
    id: 5,
    name: 'Monoprix Hammamet',
    address: 'Av. Habib Bourguiba, Hammamet 8050',
    region: 'Nabeul',
    latitude: 36.4022,
    longitude: 10.6069,
  },
  {
    id: 6,
    name: 'Magasin Général Sfax',
    address: 'Rue Habib Maazoun, Sfax 3000',
    region: 'Sfax',
    latitude: 34.7397,
    longitude: 10.7597,
  },
];

export function useLieux() {
  const [lieux, setLieux] = useState<Lieu[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadLieux = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // In real app, fetch from API
      // const response = await api.get('/lieux');
      // setLieux(response.data);
      
      // Using mock data for now
      await new Promise(resolve => setTimeout(resolve, 1000)); // simulate network request
      setLieux(mockLieux);
    } catch (err) {
      console.error('Error loading lieux:', err);
      setError('Impossible de charger les lieux');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getLieuById = useCallback(async (id: string | number) => {
    try {
      // In real app, fetch specific lieu from API
      // const response = await api.get(`/lieux/${id}`);
      // return response.data;
      
      // Using mock data for now
      await new Promise(resolve => setTimeout(resolve, 500)); // simulate network request
      const lieu = mockLieux.find(l => l.id === Number(id));
      
      if (!lieu) {
        throw new Error('Lieu not found');
      }
      
      return lieu;
    } catch (err) {
      console.error('Error getting lieu by ID:', err);
      throw err;
    }
  }, []);

  return {
    lieux,
    isLoading,
    error,
    loadLieux,
    getLieuById,
  };
}