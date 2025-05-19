import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { parkingLots, userProfile, vehicles } from '@/data/mockData';
import Colors from '@/constants/Colors';
import { ArrowLeft, Clock } from 'lucide-react-native';
import PaymentCard from '@/components/PaymentCard';

export default function PaymentScreen() {
  const { id, slotId, slotName } = useLocalSearchParams<{ id: string; slotId: string; slotName: string }>();
  const parking = parkingLots.find(p => p.id === id);
  const [duration, setDuration] = useState(4); // Default 4 hours
  const [selectedVehicleId, setSelectedVehicleId] = useState(vehicles[0]?.id || '');
  
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

  const totalAmount = duration * parking.pricePerHour;
  const selectedVehicle = vehicles.find(v => v.id === selectedVehicleId);

  const handlePay = () => {
    router.push(`/parking/${id}/confirmation?slotId=${slotId}&slotName=${slotName}&duration=${duration}&totalAmount=${totalAmount}`);
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
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={{ width: 40 }} />
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.parkingInfoContainer}>
          <Text style={styles.parkingName}>{parking.name}</Text>
          <Text style={styles.parkingAddress}>{parking.address}</Text>
          <Text style={styles.slotInfo}>Slot {slotName}</Text>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Select Vehicle</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {vehicles.map((vehicle) => (
              <TouchableOpacity
                key={vehicle.id}
                style={[
                  styles.vehicleCard,
                  selectedVehicleId === vehicle.id && styles.selectedVehicleCard,
                ]}
                onPress={() => setSelectedVehicleId(vehicle.id)}
              >
                <Text style={styles.vehicleTitle}>
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </Text>
                <Text style={styles.vehiclePlate}>{vehicle.licensePlate}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Duration</Text>
          <View style={styles.durationContainer}>
            <Clock size={20} color={Colors.primary} />
            <Text style={styles.durationText}>{duration} hours</Text>
            <View style={styles.durationControls}>
              <TouchableOpacity
                style={styles.durationButton}
                onPress={() => duration > 1 && setDuration(duration - 1)}
                disabled={duration <= 1}
              >
                <Text style={styles.durationButtonText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.durationButton}
                onPress={() => setDuration(duration + 1)}
              >
                <Text style={styles.durationButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          {userProfile.cards.map((card) => (
            <PaymentCard key={card.id} card={card} />
          ))}
        </View>
        
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Parking Fee</Text>
            <Text style={styles.summaryValue}>
              ${parking.pricePerHour.toFixed(2)} x {duration} hours
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax</Text>
            <Text style={styles.summaryValue}>$0.00</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${totalAmount.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.payButton}
          onPress={handlePay}
        >
          <Text style={styles.payButtonText}>Pay ${totalAmount.toFixed(2)}</Text>
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
  content: {
    flex: 1,
  },
  parkingInfoContainer: {
    padding: 24,
    borderBottomWidth: 8,
    borderBottomColor: Colors.grayLight,
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
    marginBottom: 8,
  },
  slotInfo: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.primary,
  },
  sectionContainer: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  vehicleCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.divider,
    borderRadius: 12,
    marginRight: 16,
    minWidth: 180,
  },
  selectedVehicleCard: {
    borderColor: Colors.primary,
    backgroundColor: '#F0F7F0',
  },
  vehicleTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  vehiclePlate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  durationText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.textPrimary,
  },
  durationControls: {
    flexDirection: 'row',
  },
  durationButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.grayLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  durationButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: Colors.textPrimary,
  },
  summaryContainer: {
    padding: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  summaryValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.textPrimary,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
  totalLabel: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: Colors.textPrimary,
  },
  totalValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: Colors.primary,
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
  payButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  payButtonText: {
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