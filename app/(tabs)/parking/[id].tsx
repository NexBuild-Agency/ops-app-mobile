import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { parkingLots } from '@/data/mockData';
import Colors from '@/constants/Colors';
import { ArrowLeft, MapPin, Bookmark, Navigation, Clock, User } from 'lucide-react-native';
import ParkingRules from '@/components/ParkingRules';

export default function ParkingDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const parking = parkingLots.find(p => p.id === id);
  
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color={Colors.textPrimary} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>PARKING DETAIL</Text>
            <View style={{ width: 24 }} />
          </View>
          
          <Image 
            source={{ uri: parking.image }}
            style={styles.parkingImage}
          />
          
          <View style={styles.titleContainer}>
            <View>
              <Text style={styles.parkingName}>{parking.name}</Text>
              <View style={styles.addressContainer}>
                <MapPin size={16} color={Colors.textSecondary} />
                <Text style={styles.parkingAddress}>{parking.address}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.bookmarkButton}>
              <Bookmark size={24} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Navigation size={16} color={Colors.primary} />
            <Text style={styles.detailText}>{parking.distance} km²</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Clock size={16} color={Colors.primary} />
            <Text style={styles.detailText}>{parking.hours.open} - {parking.hours.close}</Text>
          </View>
          
          {parking.hasValet && (
            <View style={styles.detailItem}>
              <User size={16} color={Colors.primary} />
              <Text style={styles.detailText}>Valet</Text>
            </View>
          )}
        </View>
        
        <View style={styles.rulesContainer}>
          <ParkingRules rules={parking.rules} />
        </View>
        
        <View style={styles.infoContainer}>
          <View style={styles.availabilityContainer}>
            <Text style={styles.availabilityText}>
              {parking.slots.available} slots available
            </Text>
          </View>
          
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>
              $ {parking.pricePerHour.toFixed(2)} per hour
            </Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={() => router.push(`/parking/${id}/select-slot`)}
        >
          <Text style={styles.bookButtonText}>Book Parking</Text>
        </TouchableOpacity>
      </ScrollView>
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
    backgroundColor: Colors.white,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
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
    fontSize: 16,
    color: Colors.textPrimary,
  },
  parkingImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  parkingName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  parkingAddress: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  bookmarkButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  detailsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
  },
  detailText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.textPrimary,
    marginLeft: 6,
  },
  rulesContainer: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  infoContainer: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginVertical: 16,
  },
  availabilityContainer: {
    flex: 1,
    backgroundColor: Colors.grayLight,
    padding: 16,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  availabilityText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.textPrimary,
  },
  priceContainer: {
    flex: 1,
    backgroundColor: Colors.error,
    padding: 16,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  priceText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.white,
  },
  bookButton: {
    backgroundColor: Colors.primary,
    marginHorizontal: 24,
    marginBottom: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonText: {
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