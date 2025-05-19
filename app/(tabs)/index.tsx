import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter } from 'lucide-react-native';
import { ParkingLot, FilterParams } from '@/types';
import { parkingLots } from '@/data/mockData';
import Colors from '@/constants/Colors';
import ParkingCard from '@/components/ParkingCard';
import VehicleTypeFilter from '@/components/VehicleTypeFilter';
import FilterOptions from '@/components/FilterOptions';
import { router } from 'expo-router';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredParkingLots, setFilteredParkingLots] = useState<ParkingLot[]>(parkingLots);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedVehicleType, setSelectedVehicleType] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterParams>({
    distance: 9,
    valetParking: false,
    vehicleType: null,
  });

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      applyFilters(filters);
      return;
    }
    
    const filtered = parkingLots.filter(parking => 
      parking.name.toLowerCase().includes(text.toLowerCase()) ||
      parking.address.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredParkingLots(filtered);
  };

  const handleVehicleTypeSelect = (type: string | null) => {
    setSelectedVehicleType(type);
    setFilters({ ...filters, vehicleType: type });
    
    // Apply vehicle type filter
    if (!type || type === 'more') {
      applyFilters({ ...filters, vehicleType: null });
    } else {
      applyFilters({ ...filters, vehicleType: type });
    }
  };

  const applyFilters = (newFilters: FilterParams) => {
    let filtered = [...parkingLots];
    
    // Apply distance filter
    filtered = filtered.filter(parking => parking.distance <= newFilters.distance);
    
    // Apply valet filter if enabled
    if (newFilters.valetParking) {
      filtered = filtered.filter(parking => parking.hasValet);
    }
    
    // Apply vehicle type filter if selected
    if (newFilters.vehicleType && newFilters.vehicleType !== 'more') {
      // In a real app, you would filter based on available vehicle types
      // For this demo, we just filter a subset for demonstration
      if (newFilters.vehicleType === 'car') {
        filtered = filtered.filter(parking => parking.id !== '3');
      } else if (newFilters.vehicleType === 'bike') {
        filtered = filtered.filter(parking => parking.id !== '2');
      }
    }
    
    setFilteredParkingLots(filtered);
    setFilters(newFilters);
  };

  const getCurrentTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Morning';
    if (hour < 18) return 'Afternoon';
    return 'Evening';
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.greeting}>Good {getCurrentTimeOfDay()}, Houssem</Text>
        <Text style={styles.subtitle}>Find your perfect parking spot</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color={Colors.gray} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search parking areas"
            value={searchQuery}
            onChangeText={handleSearch}
            placeholderTextColor={Colors.gray}
          />
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilterModal(true)}
        >
          <Filter size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>
      
      <VehicleTypeFilter
        selectedType={selectedVehicleType}
        onSelect={handleVehicleTypeSelect}
      />
      
      <FlatList
        data={filteredParkingLots}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ParkingCard parking={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No parking spots found</Text>
          </View>
        }
      />
      
      {showFilterModal && (
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowFilterModal(false)}
          />
          <View style={styles.modalContent}>
            <FilterOptions
              initialFilters={filters}
              onApplyFilters={applyFilters}
              onClose={() => setShowFilterModal(false)}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  greeting: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.textSecondary,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginVertical: 16,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.grayLight,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.textPrimary,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  emptyText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.textSecondary,
  },
  modalContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
});