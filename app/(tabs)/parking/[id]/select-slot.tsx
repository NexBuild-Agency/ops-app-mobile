import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { parkingLots } from '@/data/mockData';
import Colors from '@/constants/Colors';
import { ArrowLeft } from 'lucide-react-native';
import FloorSelector from '@/components/FloorSelector';
import ParkingSlotGrid from '@/components/ParkingSlotGrid';
import { Slot } from '@/types';

export default function SelectSlotScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const parking = parkingLots.find(p => p.id === id);
  
  const [selectedFloorId, setSelectedFloorId] = useState(parking?.floors[0]?.id || '');
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  
  if (!parking) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Parking lot not found</Text>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const selectedFloor = parking.floors.find(floor => floor.id === selectedFloorId);
  
  const handleSelectSlot = (slot: Slot) => {
    // Reset previously selected slot if any
    if (selectedSlot) {
      selectedSlot.status = 'available';
    }
    
    // Set new selected slot
    slot.status = 'selected';
    setSelectedSlot(slot);
  };
  
  const handleContinue = () => {
    if (selectedSlot) {
      router.push(`/parking/${id}/payment?slotId=${selectedSlot.id}&slotName=${selectedSlot.name}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select a Parking Slot</Text>
        <View style={{ width: 40 }} />
      </View>
      
      <View style={styles.parkingInfoContainer}>
        <Text style={styles.parkingName}>{parking.name}</Text>
        <Text style={styles.parkingAddress}>{parking.address}</Text>
      </View>
      
      <FloorSelector 
        floors={parking.floors}
        selectedFloorId={selectedFloorId}
        onSelectFloor={setSelectedFloorId}
      />
      
      {selectedFloor && (
        <ParkingSlotGrid 
          slots={selectedFloor.slots}
          onSelectSlot={handleSelectSlot}
        />
      )}
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.continueButton,
            !selectedSlot && styles.disabledButton,
          ]}
          onPress={handleContinue}
          disabled={!selectedSlot}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: Colors.textPrimary,
  },
  parkingInfoContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  parkingName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  parkingAddress: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
  continueButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: Colors.gray,
  },
  continueButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.white,
  },
  backButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.primary,
  },
});