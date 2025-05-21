import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { useEvenements } from '@/hooks/useEvenements';
import { Evenement } from '@/types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Button } from '@/components/ui/Button';
import { Calendar, MapPin, FileText, Package2, CircleCheck as CheckCircle2 } from 'lucide-react-native';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getEvenementById, submitCandidature } = useEvenements();
  const [event, setEvent] = useState<Evenement | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEvent();
  }, [id]);

  const loadEvent = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getEvenementById(id);
      setEvent(data);
    } catch (err) {
      console.error('Error loading event:', err);
      setError('Impossible de charger les détails de l\'événement');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!event) return;
    
    try {
      setSubmitting(true);
      setError(null);
      await submitCandidature(event.id);
      // Show success message or navigate
    } catch (err) {
      console.error('Error submitting candidature:', err);
      setError('Impossible de soumettre votre candidature');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary.main} />
      </View>
    );
  }

  if (error || !event) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || 'Événement non trouvé'}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: event.image }}
        style={styles.image}
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{event.name}</Text>
          <View style={[
            styles.statusBadge,
            event.isActive ? styles.statusActive : styles.statusInactive
          ]}>
            <Text style={[
              styles.statusText,
              event.isActive ? styles.statusTextActive : styles.statusTextInactive
            ]}>
              {event.isActive ? 'En cours' : 'À venir'}
            </Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Calendar size={20} color={Colors.grey[500]} />
            <Text style={styles.infoText}>
              Du {format(new Date(event.startDate), 'dd MMMM yyyy', { locale: fr })} {'\n'}
              au {format(new Date(event.endDate), 'dd MMMM yyyy', { locale: fr })}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <MapPin size={20} color={Colors.grey[500]} />
            <Text style={styles.infoText}>{event.zone}</Text>
          </View>

          <View style={styles.infoRow}>
            <Package2 size={20} color={Colors.grey[500]} />
            <Text style={styles.infoText}>{event.partner}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.sectionText}>{event.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Prérequis</Text>
          <Text style={styles.sectionText}>{event.requirements}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Produits concernés</Text>
          <View style={styles.productsContainer}>
            {event.products.map((product, index) => (
              <View key={index} style={styles.productChip}>
                <Text style={styles.productChipText}>{product}</Text>
              </View>
            ))}
          </View>
        </View>

        <Button
          title="Postuler"
          onPress={handleSubmit}
          loading={submitting}
          icon={<CheckCircle2 size={20} color={Colors.common.white} />}
          style={styles.submitButton}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.default,
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
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    flex: 1,
    padding: Layout.spacing.m,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Layout.spacing.m,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.text.primary,
    flex: 1,
    marginRight: Layout.spacing.m,
  },
  statusBadge: {
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.medium,
  },
  statusActive: {
    backgroundColor: `${Colors.success.main}20`,
  },
  statusInactive: {
    backgroundColor: `${Colors.warning.main}20`,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  statusTextActive: {
    color: Colors.success.main,
  },
  statusTextInactive: {
    color: Colors.warning.main,
  },
  infoSection: {
    backgroundColor: Colors.background.paper,
    borderRadius: Layout.borderRadius.medium,
    padding: Layout.spacing.m,
    marginBottom: Layout.spacing.m,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.s,
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text.primary,
    marginLeft: Layout.spacing.m,
  },
  section: {
    marginBottom: Layout.spacing.l,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.text.primary,
    marginBottom: Layout.spacing.s,
  },
  sectionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  productChip: {
    backgroundColor: Colors.grey[100],
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.medium,
    marginRight: Layout.spacing.s,
    marginBottom: Layout.spacing.s,
  },
  productChipText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text.primary,
  },
  submitButton: {
    marginTop: Layout.spacing.m,
    marginBottom: Layout.spacing.xxl,
  },
});