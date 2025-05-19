import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Slider } from 'react-native';
import Colors from '@/constants/Colors';
import { FilterParams } from '@/types';

type FilterOptionsProps = {
  initialFilters: FilterParams;
  onApplyFilters: (filters: FilterParams) => void;
  onClose: () => void;
};

const FilterOptions = ({ initialFilters, onApplyFilters, onClose }: FilterOptionsProps) => {
  const [distance, setDistance] = useState(initialFilters.distance);
  const [valetParking, setValetParking] = useState(initialFilters.valetParking);

  const handleApplyFilters = () => {
    onApplyFilters({
      distance,
      valetParking,
      vehicleType: initialFilters.vehicleType,
    });
    onClose();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FILTER</Text>
      
      <View style={styles.optionContainer}>
        <Text style={styles.optionTitle}>Distance</Text>
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            value={distance}
            onValueChange={setDistance}
            minimumValue={1}
            maximumValue={20}
            step={1}
            minimumTrackTintColor={Colors.primary}
            maximumTrackTintColor="#E0E0E0"
            thumbTintColor={Colors.accent}
          />
          <Text style={styles.sliderValue}>{distance} km</Text>
        </View>
      </View>
      
      <View style={styles.optionContainer}>
        <Text style={styles.optionTitle}>Valet Parking</Text>
        <TouchableOpacity
          style={[styles.toggle, valetParking && styles.toggleActive]}
          onPress={() => setValetParking(!valetParking)}
          activeOpacity={0.8}
        >
          <View style={[styles.toggleCircle, valetParking && styles.toggleCircleActive]} />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity
        style={styles.applyButton}
        onPress={handleApplyFilters}
        activeOpacity={0.8}
      >
        <Text style={styles.applyButtonText}>Apply Filter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
    paddingVertical: 32,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: Colors.textPrimary,
    marginBottom: 24,
  },
  optionContainer: {
    marginBottom: 24,
  },
  optionTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  sliderContainer: {
    width: '100%',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderValue: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    backgroundColor: Colors.primary,
  },
  toggleCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  toggleCircleActive: {
    alignSelf: 'flex-end',
  },
  applyButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  applyButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.white,
  },
});

export default FilterOptions;