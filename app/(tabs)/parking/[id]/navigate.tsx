import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { parkingLots } from '@/data/mockData';
import Colors from '@/constants/Colors';
import { ArrowUpCircle, ChevronRight, Camera, Navigation, X } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function NavigateScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const parking = parkingLots.find(p => p.id === id);
  
  if (!parking) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Parking lot not found</Text>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.push('/(tabs)')}
          >
            <Text style={styles.backButtonText}>Go Home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleOpenMaps = () => {
    const address = encodeURIComponent(parking.address);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${address}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapPlaceholder}>
        <TouchableOpacity 
          style={styles.openMapsButton}
          onPress={handleOpenMaps}
        >
          <Navigation size={24} color={Colors.white} style={{ marginRight: 8 }} />
          <Text style={styles.openMapsText}>Open in Google Maps</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.directionsContainer}>
        <View style={styles.directionsContent}>
          <ArrowUpCircle size={24} color={Colors.white} />
          <View style={styles.directionsTextContainer}>
            <Text style={styles.directionsText}>To Royston St</Text>
            <Text style={styles.directionsDistance}>350 m</Text>
          </View>
          <View style={styles.thenContainer}>
            <Text style={styles.thenText}>Then</Text>
            <ChevronRight size={16} color={Colors.white} />
          </View>
        </View>
      </View>
      
      <View style={styles.destinationContainer}>
        <View style={styles.destinationContent}>
          <Text style={styles.destinationName}>{parking.name}</Text>
          <Text style={styles.destinationAddress}>{parking.address}</Text>
        </View>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => router.push('/(tabs)')}
        >
          <X size={20} color={Colors.black} />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.cameraButton}>
        <Camera size={24} color={Colors.black} />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.centerButton}
        onPress={handleOpenMaps}
      >
        <Navigation size={24} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  openMapsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  openMapsText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.white,
  },
  directionsContainer: {
    position: 'absolute',
    top: 50,
    left: width / 2 - 150,
    width: 300,
  },
  directionsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  directionsTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  directionsText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.white,
  },
  directionsDistance: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.white,
    opacity: 0.8,
  },
  thenContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  thenText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.white,
    marginRight: 4,
  },
  destinationContainer: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  destinationContent: {
    flex: 1,
  },
  destinationName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: Colors.white,
    marginBottom: 4,
  },
  destinationAddress: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.white,
    opacity: 0.8,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 100,
    right: 24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  centerButton: {
    position: 'absolute',
    bottom: 164,
    right: 24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  backButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.primary,
  },
});