import { useState, useCallback } from 'react';
import { Evenement, Candidature } from '@/types';

// Mock data for development
const mockEvenements: Evenement[] = [
  {
    id: 1,
    name: 'Promotion Carrefour',
    partner: 'Carrefour',
    startDate: '2025-08-15T00:00:00Z',
    endDate: '2025-08-20T23:59:59Z',
    zone: 'Tunis Nord',
    image: 'https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg',
    description: 'Animation et promotion des nouveaux produits dans les magasins Carrefour de Tunis Nord.',
    requirements: 'Expérience en animation commerciale requise. Bonne présentation et aisance relationnelle.',
    products: ['Alimentation', 'Produits ménagers', 'Électronique'],
    isActive: true,
  },
  {
    id: 2,
    name: 'Dégustation de produits',
    partner: 'Monoprix',
    startDate: '2025-09-01T00:00:00Z',
    endDate: '2025-09-10T23:59:59Z',
    zone: 'Sousse',
    image: 'https://images.pexels.com/photos/2280551/pexels-photo-2280551.jpeg',
    description: 'Mise en place d\'un stand de dégustation pour la nouvelle gamme de produits alimentaires.',
    requirements: 'Connaissance des normes d\'hygiène alimentaire. Permis de conduire souhaité.',
    products: ['Produits laitiers', 'Charcuterie', 'Boissons'],
    isActive: false,
  },
  {
    id: 3,
    name: 'Lancement nouvelle gamme',
    partner: 'Géant',
    startDate: '2025-08-25T00:00:00Z',
    endDate: '2025-09-05T23:59:59Z',
    zone: 'Tunis Sud',
    image: 'https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg',
    description: 'Promotion de la nouvelle gamme de produits cosmétiques écologiques.',
    requirements: 'Expérience dans le domaine des cosmétiques. Connaissance des argumentaires de vente.',
    products: ['Cosmétiques', 'Soins du corps', 'Parfumerie'],
    isActive: true,
  },
];

const mockCandidatures: Candidature[] = [
  {
    id: 1,
    evenementId: 1,
    status: 'accepted',
    date: '2025-08-05T10:15:00Z',
    evenement: mockEvenements[0],
  },
  {
    id: 2,
    evenementId: 3,
    status: 'pending',
    date: '2025-08-10T14:30:00Z',
    evenement: mockEvenements[2],
  },
];

export function useEvenements() {
  const [evenements, setEvenements] = useState<Evenement[]>([]);
  const [candidatures, setCandidatures] = useState<Candidature[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadEvenements = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // In real app, fetch from API
      // const response = await api.get('/evenements');
      // setEvenements(response.data);
      
      // Using mock data for now
      await new Promise(resolve => setTimeout(resolve, 1000)); // simulate network request
      setEvenements(mockEvenements);
    } catch (err) {
      console.error('Error loading evenements:', err);
      setError('Impossible de charger les événements');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getEvenementById = useCallback(async (id: string | number) => {
    try {
      // In real app, fetch specific evenement from API
      // const response = await api.get(`/evenements/${id}`);
      // return response.data;
      
      // Using mock data for now
      await new Promise(resolve => setTimeout(resolve, 500)); // simulate network request
      const evenement = mockEvenements.find(e => e.id === Number(id));
      
      if (!evenement) {
        throw new Error('Evenement not found');
      }
      
      return evenement;
    } catch (err) {
      console.error('Error getting evenement by ID:', err);
      throw err;
    }
  }, []);

  const loadCandidatures = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // In real app, fetch from API
      // const response = await api.get('/candidatures');
      // setCandidatures(response.data);
      
      // Using mock data for now
      await new Promise(resolve => setTimeout(resolve, 1000)); // simulate network request
      setCandidatures(mockCandidatures);
    } catch (err) {
      console.error('Error loading candidatures:', err);
      setError('Impossible de charger les candidatures');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const submitCandidature = useCallback(async (evenementId: number) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Check if already applied
      const existingCandidature = candidatures.find(c => c.evenementId === evenementId);
      if (existingCandidature) {
        throw new Error('Vous avez déjà candidaté à cet événement');
      }
      
      // In real app, post to API
      // const response = await api.post('/candidatures', { evenementId });
      // const newCandidature = response.data;
      
      // Using mock response for now
      await new Promise(resolve => setTimeout(resolve, 1500)); // simulate network request
      
      const evenement = mockEvenements.find(e => e.id === evenementId);
      if (!evenement) {
        throw new Error('Événement non trouvé');
      }
      
      const newCandidature: Candidature = {
        id: Date.now(),
        evenementId,
        status: 'pending',
        date: new Date().toISOString(),
        evenement,
      };
      
      setCandidatures(prev => [...prev, newCandidature]);
      
      return newCandidature;
    } catch (err) {
      console.error('Error submitting candidature:', err);
      setError('Impossible de soumettre la candidature');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [candidatures]);

  return {
    evenements,
    candidatures,
    isLoading,
    error,
    loadEvenements,
    getEvenementById,
    loadCandidatures,
    submitCandidature,
  };
}