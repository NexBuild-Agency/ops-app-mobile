import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Slot } from '@/types';
import Colors from '@/constants/Colors';

type ParkingSlotGridProps = {
  slots: Slot[];
  onSelectSlot: (slot: Slot) => void;
};

const ParkingSlotGrid = ({ slots, onSelectSlot }: ParkingSlotGridProps) => {
  const renderSlots = () => {
    // Create a 3-column grid
    const rows = [];
    for (let i = 0; i < slots.length; i += 3) {
      const rowSlots = slots.slice(i, i + 3);
      rows.push(
        <View key={`row-${i}`} style={styles.row}>
          {rowSlots.map((slot) => (
            <TouchableOpacity
              key={slot.id}
              style={[
                styles.slot,
                slot.status === 'occupied' && styles.occupiedSlot,
                slot.status === 'selected' && styles.selectedSlot,
              ]}
              onPress={() => slot.status !== 'occupied' && onSelectSlot(slot)}
              disabled={slot.status === 'occupied'}
              activeOpacity={slot.status === 'occupied' ? 1 : 0.7}
            >
              <Text style={[
                styles.slotText,
                (slot.status === 'selected' || slot.status === 'occupied') && styles.slotTextAlt,
              ]}>
                {slot.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }
    return rows;
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: Colors.availableSlot }]} />
          <Text style={styles.legendText}>Available</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: Colors.occupiedSlot }]} />
          <Text style={styles.legendText}>Occupied</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: Colors.selectedSlot }]} />
          <Text style={styles.legendText}>Selected</Text>
        </View>
      </View>
      
      <View style={styles.gridContainer}>
        {renderSlots()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 16,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  legendText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.textSecondary,
  },
  gridContainer: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  slot: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: Colors.availableSlot,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  occupiedSlot: {
    backgroundColor: Colors.occupiedSlot,
  },
  selectedSlot: {
    backgroundColor: Colors.selectedSlot,
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  slotText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: Colors.white,
  },
  slotTextAlt: {
    color: Colors.white,
  },
});

export default ParkingSlotGrid;