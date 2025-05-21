import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { Pointage } from '@/types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Feather } from '@expo/vector-icons';

interface PointageCardProps {
  pointage: Pointage;
  onPress: () => void;
}

export const PointageCard = ({ pointage, onPress }: PointageCardProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image 
        source={{ uri: pointage.photo }} 
        style={styles.image}
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.date}>
            {format(new Date(pointage.timestamp), 'dd MMM yyyy', { locale: fr })}
          </Text>
          <StatusBadge status={pointage.status} />
        </View>
        
        <View style={styles.locationContainer}>
          <Feather name="map-pin" size={14} color={Colors.grey[500]} style={styles.icon} />
          <Text style={styles.location}>
            Lat: {pointage.latitude.toFixed(4)}, Long: {pointage.longitude.toFixed(4)}
          </Text>
        </View>
        
        <View style={styles.timeContainer}>
          <Feather name="clock" size={14} color={Colors.grey[500]} style={styles.icon} />
          <Text style={styles.time}>
            {format(new Date(pointage.timestamp), 'HH:mm', { locale: fr })}
          </Text>
        </View>
        
        <TouchableOpacity style={styles.viewButton} onPress={onPress}>
          <Text style={styles.viewButtonText}>Voir détails</Text>
          <Feather name="chevron-right" size={16} color={Colors.primary.main} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.background.paper,
    borderRadius: Layout.borderRadius.medium,
    marginBottom: Layout.spacing.m,
    overflow: 'hidden',
    shadowColor: Colors.grey[900],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 'auto',
    flex: 1,
  },
  content: {
    flex: 2,
    padding: Layout.spacing.m,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.m,
  },
  date: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.text.primary,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.xs,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.m,
  },
  icon: {
    marginRight: Layout.spacing.xs,
  },
  location: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.text.secondary,
  },
  time: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.text.secondary,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  viewButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary.main,
    marginRight: Layout.spacing.xs,
  },
});