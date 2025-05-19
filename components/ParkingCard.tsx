import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { ParkingLot } from '@/types';
import { MapPin } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { router } from 'expo-router';

type ParkingCardProps = {
  parking: ParkingLot;
};

const ParkingCard = ({ parking }: ParkingCardProps) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => router.push(`/(tabs)/parking/${parking.id}`)}
      activeOpacity={0.7}
    >
      <Image source={{ uri: parking.image }} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.name} numberOfLines={1}>{parking.name}</Text>
        <View style={styles.addressContainer}>
          <MapPin size={16} color={Colors.gray} />
          <Text style={styles.address} numberOfLines={1}>{parking.address}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.price}>${parking.pricePerHour.toFixed(2)}/hr</Text>
          <Text style={styles.distance}>{parking.distance} km</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 12,
  },
  name: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  address: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 4,
    flex: 1,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.primary,
  },
  distance: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
  },
});

export default ParkingCard;