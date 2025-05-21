import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { Evenement } from '@/types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Feather } from '@expo/vector-icons';

interface EventCardProps {
  event: Evenement;
  onPress: () => void;
}

export const EventCard = ({ event, onPress }: EventCardProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image 
        source={{ uri: event.image }} 
        style={styles.image}
        resizeMode="cover"
      />
      
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.name}>{event.name}</Text>
            <View style={[
              styles.activeBadge,
              event.isActive ? styles.activeBadgeActive : styles.activeBadgeInactive
            ]}>
              <Text style={[
                styles.activeBadgeText,
                event.isActive ? styles.activeBadgeTextActive : styles.activeBadgeTextInactive
              ]}>
                {event.isActive ? 'En cours' : 'À venir'}
              </Text>
            </View>
          </View>
          
          <View style={styles.partnerContainer}>
            <Text style={styles.partnerLabel}>Partenaire:</Text>
            <Text style={styles.partnerText}>{event.partner}</Text>
          </View>
          
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Feather name="calendar" size={14} color={Colors.common.white} style={styles.icon} />
              <Text style={styles.infoText}>
                {format(new Date(event.startDate), 'dd MMM', { locale: fr })} - {format(new Date(event.endDate), 'dd MMM yyyy', { locale: fr })}
              </Text>
            </View>
            
            <View style={styles.infoItem}>
              <Feather name="map-pin" size={14} color={Colors.common.white} style={styles.icon} />
              <Text style={styles.infoText}>{event.zone}</Text>
            </View>
          </View>
          
          <View style={styles.productsContainer}>
            {event.products.map((product, index) => (
              <View key={index} style={styles.productChip}>
                <Text style={styles.productChipText}>{product}</Text>
              </View>
            ))}
          </View>
          
          <TouchableOpacity style={styles.detailsButton} onPress={onPress}>
            <Text style={styles.detailsButtonText}>Voir détails</Text>
            <Feather name="chevron-right" size={16} color={Colors.common.white} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 250,
    borderRadius: Layout.borderRadius.medium,
    marginBottom: Layout.spacing.m,
    overflow: 'hidden',
    shadowColor: Colors.grey[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  content: {
    padding: Layout.spacing.m,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.s,
  },
  name: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: Colors.common.white,
    flex: 1,
  },
  activeBadge: {
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: 3,
    borderRadius: Layout.borderRadius.medium,
  },
  activeBadgeActive: {
    backgroundColor: `${Colors.success.main}40`,
  },
  activeBadgeInactive: {
    backgroundColor: `${Colors.warning.main}40`,
  },
  activeBadgeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  activeBadgeTextActive: {
    color: Colors.success.main,
  },
  activeBadgeTextInactive: {
    color: Colors.warning.main,
  },
  partnerContainer: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.m,
  },
  partnerLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.grey[300],
    marginRight: Layout.spacing.xs,
  },
  partnerText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.common.white,
  },
  infoContainer: {
    marginBottom: Layout.spacing.m,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.xs,
  },
  icon: {
    marginRight: Layout.spacing.xs,
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.common.white,
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Layout.spacing.m,
  },
  productChip: {
    backgroundColor: `${Colors.primary.main}80`,
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: 3,
    borderRadius: Layout.borderRadius.small,
    marginRight: Layout.spacing.xs,
    marginBottom: Layout.spacing.xs,
  },
  productChipText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.common.white,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  detailsButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.common.white,
    marginRight: Layout.spacing.xs,
  },
});