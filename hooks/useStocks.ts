import { useState, useCallback } from 'react';
import { Stock, StockUpdate } from '@/types';

// Mock data for development
const mockStocks: Stock[] = [
  {
    id: 1,
    eventId: 1,
    lieuId: 1,
    product: 'Chocolat Bio',
    productCode: 'CHOC-001',
    initialQuantity: 100,
    quantity: 65,
    event: {
      id: 1,
      name: 'Promotion Carrefour',
    },
    lieu: {
      id: 1,
      name: 'Carrefour La Marsa',
    },
  },
  {
    id: 2,
    eventId: 1,
    lieuId: 1,
    product: 'Café Arabica',
    productCode: 'CAFE-002',
    initialQuantity: 50,
    quantity: 10,
    event: {
      id: 1,
      name: 'Promotion Carrefour',
    },
    lieu: {
      id: 1,
      name: 'Carrefour La Marsa',
    },
  },
  {
    id: 3,
    eventId: 3,
    lieuId: 3,
    product: 'Shampoing Naturel',
    productCode: 'SHAM-001',
    initialQuantity: 80,
    quantity: 54,
    event: {
      id: 3,
      name: 'Lancement nouvelle gamme',
    },
    lieu: {
      id: 3,
      name: 'Géant Tunis City',
    },
  },
  {
    id: 4,
    eventId: 3,
    lieuId: 3,
    product: 'Crème Hydratante',
    productCode: 'CREM-002',
    initialQuantity: 60,
    quantity: 20,
    event: {
      id: 3,
      name: 'Lancement nouvelle gamme',
    },
    lieu: {
      id: 3,
      name: 'Géant Tunis City',
    },
  },
];

export function useStocks() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadStocks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // In real app, fetch from API
      // const response = await api.get('/stocks');
      // setStocks(response.data);
      
      // Using mock data for now
      await new Promise(resolve => setTimeout(resolve, 1000)); // simulate network request
      setStocks(mockStocks);
    } catch (err) {
      console.error('Error loading stocks:', err);
      setError('Impossible de charger les stocks');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateStock = useCallback(async (stockId: number, update: StockUpdate) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // In real app, update via API
      // const response = await api.patch(`/stocks/${stockId}`, update);
      // const updatedStock = response.data;
      
      // Using mock update for now
      await new Promise(resolve => setTimeout(resolve, 1000)); // simulate network request
      
      setStocks(prev => prev.map(stock => {
        if (stock.id === stockId) {
          return {
            ...stock,
            quantity: Math.max(0, stock.quantity - update.usedQuantity),
          };
        }
        return stock;
      }));
    } catch (err) {
      console.error('Error updating stock:', err);
      setError('Impossible de mettre à jour le stock');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    stocks,
    isLoading,
    error,
    loadStocks,
    updateStock,
  };
}