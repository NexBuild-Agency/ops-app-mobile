import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { Brief } from '@/types';
import { EmptyState } from '@/components/ui/EmptyState';
import { Play, BookOpen } from 'lucide-react-native';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const mockBriefs: Brief[] = [
  {
    id: 1,
    title: 'Techniques de vente avancées',
    description: 'Découvrez les techniques de vente les plus efficaces utilisées par les professionnels. Cette formation couvre l\'approche client, la présentation produit, la gestion des objections et la conclusion de vente.',
    videoUrl: 'https://www.youtube.com/embed/lp1QvGQqhNY',
    date: '2025-04-15T10:00:00Z',
    hasQuiz: true,
  },
  {
    id: 2,
    title: 'Merchandising et présentation produits',
    description: 'Apprenez à optimiser la présentation des produits en magasin. Cette formation couvre les principes du merchandising, la mise en valeur des produits et l\'optimisation de l\'espace de vente.',
    videoUrl: 'https://www.youtube.com/embed/8zKuNo4y3yc',
    date: '2025-04-14T14:30:00Z',
    hasQuiz: true,
  },
  {
    id: 3,
    title: 'Communication client efficace',
    description: 'Maîtrisez l\'art de la communication client pour améliorer vos performances commerciales. Cette formation aborde le langage verbal et non-verbal, l\'écoute active et la gestion des situations difficiles.',
    videoUrl: 'https://www.youtube.com/embed/JwQmHzxHfvI',
    date: '2025-04-13T09:15:00Z',
    hasQuiz: true,
  },
  {
    id: 4,
    title: 'Gestion du stress en période de rush',
    description: 'Apprenez à gérer efficacement le stress pendant les périodes de forte affluence. Techniques de respiration, organisation du temps et méthodes de priorisation.',
    videoUrl: 'https://www.youtube.com/embed/ztj9fqNPvXQ',
    date: '2025-04-12T11:00:00Z',
    hasQuiz: true,
  },
  {
    id: 5,
    title: 'Hygiène et sécurité alimentaire',
    description: 'Formation essentielle sur les normes d\'hygiène et de sécurité alimentaire. Couvre les bonnes pratiques, la réglementation et les procédures à suivre.',
    videoUrl: 'https://www.youtube.com/embed/8PH4JQfVDrM',
    date: '2025-04-11T15:45:00Z',
    hasQuiz: true,
  }
];

export default function BriefsScreen() {
  const [briefs, setBriefs] = useState<Brief[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBriefs();
  }, []);

  const loadBriefs = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setBriefs(mockBriefs);
    } catch (error) {
      console.error('Error loading briefs:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderBrief = ({ item }: { item: Brief }) => (
    <TouchableOpacity
      style={styles.briefCard}
      onPress={() => router.push(`/briefs/details?id=${item.id}`)}
      activeOpacity={0.7}
    >
      <View style={styles.briefHeader}>
        <View style={styles.iconContainer}>
          <BookOpen size={24} color={Colors.primary.main} />
        </View>
        <Text style={styles.date}>
          {format(new Date(item.date), 'dd MMMM yyyy', { locale: fr })}
        </Text>
      </View>

      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>

      <View style={styles.footer}>
        <View style={styles.quizBadge}>
          <Text style={styles.quizText}>
            {item.hasQuiz ? 'Quiz disponible' : 'Lecture seule'}
          </Text>
        </View>

        <TouchableOpacity style={styles.watchButton}>
          <Play size={16} color={Colors.primary.main} />
          <Text style={styles.watchText}>Regarder</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={briefs}
        renderItem={renderBrief}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          !loading && (
            <EmptyState
              icon="book-open"
              title="Aucun brief disponible"
              message="Il n'y a pas de briefs disponibles pour le moment"
            />
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.default,
  },
  listContent: {
    padding: Layout.spacing.m,
  },
  briefCard: {
    backgroundColor: Colors.background.paper,
    borderRadius: Layout.borderRadius.medium,
    padding: Layout.spacing.m,
    marginBottom: Layout.spacing.m,
    shadowColor: Colors.grey[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  briefHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.m,
  },
  iconContainer: {
    backgroundColor: `${Colors.primary.main}15`,
    padding: Layout.spacing.s,
    borderRadius: Layout.borderRadius.medium,
  },
  date: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.text.primary,
    marginBottom: Layout.spacing.s,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: Layout.spacing.m,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quizBadge: {
    backgroundColor: Colors.grey[100],
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.medium,
  },
  quizText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.text.secondary,
  },
  watchButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  watchText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary.main,
    marginLeft: Layout.spacing.xs,
  },
});