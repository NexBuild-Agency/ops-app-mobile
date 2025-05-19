import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { bookings } from '@/data/mockData';
import Colors from '@/constants/Colors';
import { Calendar, Navigation } from 'lucide-react-native';
import { router } from 'expo-router';
import BookingConfirmation from '@/components/BookingConfirmation';

export default function BookingsScreen() {
  const handleViewBooking = (bookingId: string) => {
    router.push(`/(tabs)/booking/${bookingId}`);
  };

  const handleNavigate = (bookingId: string) => {
    router.push(`/(tabs)/navigation/${bookingId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Bookings</Text>
      </View>
      
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookingContainer}>
            <BookingConfirmation booking={item} />
            <TouchableOpacity
              style={styles.navigateButton}
              onPress={() => handleNavigate(item.id)}
            >
              <Navigation size={20} color={Colors.white} style={{ marginRight: 8 }} />
              <Text style={styles.navigateText}>Navigate</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Calendar size={64} color={Colors.gray} />
            <Text style={styles.emptyTitle}>No Bookings Yet</Text>
            <Text style={styles.emptyText}>
              Your booking history will appear here.
            </Text>
          </View>
        }
      />
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
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.textPrimary,
  },
  listContainer: {
    padding: 24,
  },
  bookingContainer: {
    marginBottom: 24,
  },
  navigateButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 12,
  },
  navigateText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.white,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: Colors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});