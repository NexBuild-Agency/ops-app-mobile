import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Floor } from '@/types';
import Colors from '@/constants/Colors';

type FloorSelectorProps = {
  floors: Floor[];
  selectedFloorId: string;
  onSelectFloor: (floorId: string) => void;
};

const FloorSelector = ({ floors, selectedFloorId, onSelectFloor }: FloorSelectorProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {floors.map((floor) => (
        <TouchableOpacity
          key={floor.id}
          style={[
            styles.floorButton,
            selectedFloorId === floor.id && styles.selectedFloorButton,
          ]}
          onPress={() => onSelectFloor(floor.id)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.floorText,
              selectedFloorId === floor.id && styles.selectedFloorText,
            ]}
          >
            {floor.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  floorButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: Colors.grayLight,
  },
  selectedFloorButton: {
    backgroundColor: Colors.primary,
  },
  floorText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.textPrimary,
  },
  selectedFloorText: {
    color: Colors.white,
  },
});

export default FloorSelector;