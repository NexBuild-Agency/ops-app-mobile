import { View, StyleSheet, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { usePointages } from '@/hooks/usePointages';
import { Pointage } from '@/types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { StatusBadge } from '@/components/ui/StatusBadge';

export default function PointageDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getPointageById } = usePointages();
  const [pointage, setPointage] = useState<Pointage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadPointage();
    }
  }, [id]);

  const loadPointage = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPointageById(id);
      setPointage(data);
    } catch (err) {
      console.error('Error loading pointage:', err);
      setError('Impossible de charger les détails du pointage');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary.main} />
      </View>
    );
  }

  if (error || !pointage) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || 'Pointage non trouvé'}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.section}>
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>Détails du pointage</Text>
          <StatusBadge status={pointage.status} />
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>ID:</Text>
          <Text style={styles.infoValue}>{pointage.id}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Date:</Text>
          <Text style={styles.infoValue}>
            {format(new Date(pointage.timestamp), 'dd MMMM yyyy', { locale: fr })}
          </Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Heure:</Text>
          <Text style={styles.infoValue}>
            {format(new Date(pointage.timestamp), 'HH:mm', { locale: fr })}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Photo</Text>
        <Image 
          source={{ uri: pointage.photo }}
          style={styles.photo}
          resizeMode="cover"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emplacement</Text>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/4429279/pexels-photo-4429279.jpeg' }}
          style={styles.locationImage}
          resizeMode="cover"
        />
        <View style={styles.coordsContainer}>
          <Text style={styles.coordsText}>
            Latitude: {pointage.latitude.toFixed(6)}
          </Text>
          <Text style={styles.coordsText}>
            Longitude: {pointage.longitude.toFixed(6)}
          </Text>
        </View>
      </View>

      {pointage.feedback && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Retour</Text>
          <View style={styles.feedbackContainer}>
            <Text style={styles.feedbackText}>{pointage.feedback}</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.default,
  },
  contentContainer: {
    padding: Layout.spacing.m,
    paddingBottom: Layout.spacing.xxl,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacing.l,
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  section: {
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.m,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.text.primary,
    marginBottom: Layout.spacing.m,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.s,
  },
  infoLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.text.secondary,
    width: 80,
  },
  infoValue: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text.primary,
    flex: 1,
  },
  photo: {
    width: '100%',
    height: 200,
    borderRadius: Layout.borderRadius.medium,
  },
  locationImage: {
    width: '100%',
    height: 200,
    borderRadius: Layout.borderRadius.medium,
    marginBottom: Layout.spacing.m,
  },
  coordsContainer: {
    backgroundColor: Colors.grey[100],
    padding: Layout.spacing.m,
    borderRadius: Layout.borderRadius.medium,
  },
  coordsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: Layout.spacing.xs,
  },
  feedbackContainer: {
    backgroundColor: Colors.grey[100],
    padding: Layout.spacing.m,
    borderRadius: Layout.borderRadius.medium,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary.main,
  },
  feedbackText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text.primary,
    lineHeight: 20,
  },
});