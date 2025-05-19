import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { parkingLots, vehicles } from '@/data/mockData';
import Colors from '@/constants/Colors';
import { X } from 'lucide-react-native';
import BookingConfirmation from '@/components/BookingConfirmation';

export default function ConfirmationScreen() {
  const { id, slotId, slotName, duration, totalAmount } = useLocalSearchParams<{ 
    id: string; 
    slotId: string; 
    slotName: string;
    duration: string;
    totalAmount: string;
  }>();
  
  const parking = parkingLots.find(p => p.id === id);
  const vehicle = vehicles[0]; // Use first vehicle for demo
  
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

  // Create mock booking data
  const booking = {
    id: '1',
    parkingLotId: id || '',
    parkingLotName: parking.name,
    parkingLotAddress: parking.address,
    slotId: slotId || '',
    slotName: slotName || '',
    vehicleId: vehicle.id,
    vehicleInfo: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
    licensePlate: vehicle.licensePlate,
    date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
    duration: parseInt(duration || '4'),
    startTime: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
    endTime: '',
    amount: parseFloat(totalAmount || '0'),
    status: 'active',
  };

  const handleClose = () => {
    router.push('/(tabs)');
  };
  
  const handleNavigate = () => {
    router.push(`/parking/${id}/navigate`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={handleClose}
        >
          <X size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.successContainer}>
          <Text style={styles.successText}>Booking Successful!</Text>
          <Text style={styles.successDescription}>
            Your parking slot has been booked successfully. Here's your parking ticket.
          </Text>
        </View>
        
        <BookingConfirmation booking={booking} />
        
        <TouchableOpacity 
          style={styles.navigateButton}
          onPress={handleNavigate}
        >
          <Text style={styles.navigateButtonText}>Navigate</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
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
    color: Colors.white,
    marginBottom: 16,
  },
  header: {
    padding: 16,
    alignItems: 'flex-end',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  successContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  successText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.white,
    marginBottom: 8,
  },
  successDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.white,
    opacity: 0.8,
    textAlign: 'center',
  },
  navigateButton: {
    backgroundColor: Colors.white,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  navigateButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.primary,
  },
  backButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.white,
  },
});