import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import { Car, Bike, Truck, Scroll } from 'lucide-react-native';

type VehicleTypeProps = {
  selectedType: string | null;
  onSelect: (type: string | null) => void;
};

const VehicleTypeFilter = ({ selectedType, onSelect }: VehicleTypeProps) => {
  const vehicleTypes = [
    { id: 'car', label: 'Car', icon: (color: string) => <Car size={24} color={color} /> },
    { id: 'bike', label: 'Bike', icon: (color: string) => <Bike size={24} color={color} /> },
    { id: 'van', label: 'Van', icon: (color: string) => <Truck size={24} color={color} /> },
    { id: 'scooter', label: 'Scooter', icon: (color: string) => <Bike size={24} color={color} /> },
    { id: 'more', label: 'More', icon: (color: string) => <Scroll size={24} color={color} /> },
  ];

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {vehicleTypes.map((type) => (
        <TouchableOpacity
          key={type.id}
          style={[
            styles.typeButton,
            selectedType === type.id && styles.selectedTypeButton,
          ]}
          onPress={() => onSelect(type.id)}
          activeOpacity={0.7}
        >
          {type.icon(selectedType === type.id ? Colors.white : Colors.primary)}
          <Text
            style={[
              styles.typeText,
              selectedType === type.id && styles.selectedTypeText,
            ]}
          >
            {type.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  typeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
    minWidth: 80,
  },
  selectedTypeButton: {
    backgroundColor: Colors.primary,
  },
  typeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.primary,
    marginTop: 6,
  },
  selectedTypeText: {
    color: Colors.white,
  },
});

export default VehicleTypeFilter;