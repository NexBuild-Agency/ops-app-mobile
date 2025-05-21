import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { Lieu } from '@/types';
import { MapPin } from 'lucide-react-native';

interface LieuListItemProps {
  lieu: Lieu;
  selected: boolean;
  onPress: () => void;
}

export const LieuListItem = ({ lieu, selected, onPress }: LieuListItemProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        selected && styles.containerSelected
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <MapPin size={24} color={selected ? Colors.primary.main : Colors.grey[500]} />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.name}>{lieu.name}</Text>
        <Text style={styles.address}>{lieu.address}</Text>
        <Text style={styles.region}>{lieu.region}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.background.paper,
    borderRadius: Layout.borderRadius.medium,
    padding: Layout.spacing.m,
    marginBottom: Layout.spacing.m,
    shadowColor: Colors.grey[900],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  containerSelected: {
    borderWidth: 2,
    borderColor: Colors.primary.main,
  },
  iconContainer: {
    marginRight: Layout.spacing.m,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.text.primary,
    marginBottom: Layout.spacing.xs,
  },
  address: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: Layout.spacing.xs,
  },
  region: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary.main,
  },
});