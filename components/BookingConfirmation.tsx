import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Booking } from '@/types';
import Colors from '@/constants/Colors';

// We'd normally use a barcode generator package, but for demo purposes using an image
const barcodeImage = 'https://i.imgur.com/NrIC8NW.png';

type BookingConfirmationProps = {
  booking: Booking;
};

const BookingConfirmation = ({ booking }: BookingConfirmationProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.title}>{booking.parkingLotName}</Text>
        <Text style={styles.address}>{booking.parkingLotAddress}</Text>
      </View>
      
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>VEHICLE</Text>
        <Text style={styles.infoText}>{booking.vehicleInfo} • {booking.licensePlate}</Text>
      </View>
      
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>DURATION</Text>
        <Text style={styles.infoText}>{booking.duration} hours • {booking.date}</Text>
      </View>
      
      <View style={styles.slotSection}>
        <Text style={styles.slotText}>Slot {booking.slotName}</Text>
      </View>
      
      <View style={styles.barcodeContainer}>
        <Image 
          source={{ uri: barcodeImage }}
          style={styles.barcode}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 24,
  },
  headerSection: {
    padding: 20,
    backgroundColor: Colors.white,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  address: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  infoSection: {
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  infoText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.textPrimary,
  },
  slotSection: {
    padding: 16,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
  },
  slotText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: Colors.white,
  },
  barcodeContainer: {
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    borderStyle: 'dashed',
  },
  barcode: {
    width: '100%',
    height: 80,
  },
});

export default BookingConfirmation;