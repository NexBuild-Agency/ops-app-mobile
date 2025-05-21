import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { Stock, StockUpdate } from '@/types';
import { Feather } from '@expo/vector-icons';
import { TextInput } from '@/components/ui/TextInput';
import { Button } from '@/components/ui/Button';

interface StockCardProps {
  stock: Stock;
  onUpdate: (stockId: number, update: StockUpdate) => Promise<void>;
}

export const StockCard = ({ stock, onUpdate }: StockCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [usedQuantity, setUsedQuantity] = useState('0');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEdit = () => {
    setIsEditing(true);
    setUsedQuantity('0');
    setError(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUsedQuantity('0');
    setError(null);
  };

  const handleUpdate = async () => {
    const quantity = parseInt(usedQuantity, 10);
    
    if (isNaN(quantity) || quantity <= 0) {
      setError('Veuillez entrer une quantité valide');
      return;
    }
    
    if (quantity > stock.quantity) {
      setError('La quantité utilisée ne peut pas dépasser le stock disponible');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      await onUpdate(stock.id, { usedQuantity: quantity });
      
      setIsEditing(false);
      setUsedQuantity('0');
    } catch (err) {
      console.error('Error updating stock:', err);
      setError('Une erreur est survenue lors de la mise à jour du stock');
    } finally {
      setLoading(false);
    }
  };

  const stockPercentage = (stock.quantity / stock.initialQuantity) * 100;
  
  const getStockColor = () => {
    if (stockPercentage <= 20) return Colors.error.main;
    if (stockPercentage <= 50) return Colors.warning.main;
    return Colors.success.main;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.product}>{stock.product}</Text>
        <Text style={styles.code}>{stock.productCode}</Text>
      </View>
      
      <View style={styles.eventContainer}>
        <View style={styles.eventInfo}>
          <Feather name="calendar" size={14} color={Colors.text.secondary} style={styles.icon} />
          <Text style={styles.eventName}>{stock.event.name}</Text>
        </View>
        
        <View style={styles.eventInfo}>
          <Feather name="map-pin" size={14} color={Colors.text.secondary} style={styles.icon} />
          <Text style={styles.lieuName}>{stock.lieu.name}</Text>
        </View>
      </View>
      
      <View style={styles.stockInfo}>
        <View style={styles.stockDetails}>
          <Text style={styles.stockLabel}>Quantité initiale:</Text>
          <Text style={styles.stockValue}>{stock.initialQuantity}</Text>
        </View>
        
        <View style={styles.stockDetails}>
          <Text style={styles.stockLabel}>Quantité utilisée:</Text>
          <Text style={styles.stockValue}>{stock.initialQuantity - stock.quantity}</Text>
        </View>
        
        <View style={styles.stockDetails}>
          <Text style={styles.stockLabel}>Stock disponible:</Text>
          <Text style={[styles.stockValue, { color: getStockColor() }]}>{stock.quantity}</Text>
        </View>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <View 
            style={[
              styles.progressBar, 
              { 
                width: `${stockPercentage}%`,
                backgroundColor: getStockColor(),
              }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>{stockPercentage.toFixed(0)}%</Text>
      </View>
      
      {isEditing ? (
        <View style={styles.editContainer}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Quantité utilisée:</Text>
            <TextInput
              value={usedQuantity}
              onChangeText={setUsedQuantity}
              keyboardType="number-pad"
              error={error || undefined}
            />
          </View>
          
          <View style={styles.buttonGroup}>
            <Button
              title="Annuler"
              variant="outlined"
              onPress={handleCancel}
              style={styles.cancelButton}
            />
            <Button
              title="Mettre à jour"
              onPress={handleUpdate}
              loading={loading}
              style={styles.updateButton}
            />
          </View>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.editButton}
          onPress={handleEdit}
        >
          <Feather name="edit-2" size={16} color={Colors.primary.main} />
          <Text style={styles.editButtonText}>Mettre à jour le stock</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background.paper,
    borderRadius: Layout.borderRadius.medium,
    padding: Layout.spacing.m,
    marginBottom: Layout.spacing.m,
    shadowColor: Colors.grey[900],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.m,
  },
  product: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.text.primary,
  },
  code: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    backgroundColor: Colors.grey[100],
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: 2,
    borderRadius: Layout.borderRadius.small,
  },
  eventContainer: {
    marginBottom: Layout.spacing.m,
  },
  eventInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.xs,
  },
  icon: {
    marginRight: Layout.spacing.xs,
  },
  eventName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.text.secondary,
  },
  lieuName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.text.secondary,
  },
  stockInfo: {
    marginBottom: Layout.spacing.m,
  },
  stockDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.xs,
  },
  stockLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
  },
  stockValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.text.primary,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.m,
  },
  progressBackground: {
    flex: 1,
    height: 10,
    backgroundColor: Colors.grey[200],
    borderRadius: 5,
    marginRight: Layout.spacing.m,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
  },
  progressText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.text.secondary,
    width: 40,
    textAlign: 'right',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Layout.spacing.s,
  },
  editButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary.main,
    marginLeft: Layout.spacing.xs,
  },
  editContainer: {
    marginTop: Layout.spacing.s,
  },
  formGroup: {
    marginBottom: Layout.spacing.m,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: Layout.spacing.xs,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    marginRight: Layout.spacing.s,
  },
  updateButton: {
    flex: 1,
    marginLeft: Layout.spacing.s,
  },
});