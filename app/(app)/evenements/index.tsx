import { View, StyleSheet, FlatList, RefreshControl, TextInput, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { useEvenements } from '@/hooks/useEvenements';
import { EventCard } from '@/components/evenements/EventCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Search, Filter } from 'lucide-react-native';

export default function EvenementsScreen() {
  const { evenements, loadEvenements, isLoading } = useEvenements();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  useEffect(() => {
    loadEvenements();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadEvenements();
    setRefreshing(false);
  };

  const handleEventPress = (id: number) => {
    router.push(`/evenements/details?id=${id}`);
  };

  const regions = [...new Set(evenements.map(event => event.zone))].sort();

  const filteredEvents = evenements.filter(event => {
    const matchesSearch = searchQuery === '' || 
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.partner.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRegion = selectedRegion === null || event.zone === selectedRegion;
    
    return matchesSearch && matchesRegion;
  });

  const renderHeader = useCallback(() => (
    <View style={styles.header}>
      <View style={styles.searchContainer}>
        <Search size={20} color={Colors.grey[500]} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un événement..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={Colors.grey[400]}
        />
      </View>

      <View style={styles.filtersContainer}>
        <View style={styles.filterHeader}>
          <Filter size={20} color={Colors.text.primary} />
          <Text style={styles.filterTitle}>Filtrer par région</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScroll}
        >
          <TouchableOpacity
            style={[
              styles.filterChip,
              selectedRegion === null && styles.filterChipActive
            ]}
            onPress={() => setSelectedRegion(null)}
          >
            <Text style={[
              styles.filterChipText,
              selectedRegion === null && styles.filterChipTextActive
            ]}>
              Toutes les régions
            </Text>
          </TouchableOpacity>
          
          {regions.map(region => (
            <TouchableOpacity
              key={region}
              style={[
                styles.filterChip,
                selectedRegion === region && styles.filterChipActive
              ]}
              onPress={() => setSelectedRegion(region)}
            >
              <Text style={[
                styles.filterChipText,
                selectedRegion === region && styles.filterChipTextActive
              ]}>
                {region}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  ), [searchQuery, selectedRegion, regions]);

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            onPress={() => handleEventPress(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={Colors.primary.main}
          />
        }
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          !isLoading ? (
            <EmptyState
              icon="calendar"
              title="Aucun événement trouvé"
              message={
                searchQuery || selectedRegion
                  ? "Aucun événement ne correspond à vos critères de recherche"
                  : "Il n'y a aucun événement disponible pour le moment"
              }
              actionLabel={selectedRegion ? "Voir tous" : undefined}
              onAction={selectedRegion ? () => setSelectedRegion(null) : undefined}
            />
          ) : null
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
  header: {
    padding: Layout.spacing.m,
    backgroundColor: Colors.background.paper,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    marginBottom: Layout.spacing.m,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.grey[100],
    borderRadius: Layout.borderRadius.medium,
    paddingHorizontal: Layout.spacing.m,
    marginBottom: Layout.spacing.m,
  },
  searchIcon: {
    marginRight: Layout.spacing.s,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.text.primary,
  },
  filtersContainer: {
    marginBottom: Layout.spacing.xs,
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.s,
  },
  filterTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.text.primary,
    marginLeft: Layout.spacing.s,
  },
  filtersScroll: {
    paddingRight: Layout.spacing.l,
  },
  filterChip: {
    paddingVertical: Layout.spacing.xs,
    paddingHorizontal: Layout.spacing.m,
    borderRadius: Layout.borderRadius.medium,
    marginRight: Layout.spacing.s,
    backgroundColor: Colors.grey[100],
  },
  filterChipActive: {
    backgroundColor: Colors.primary.main,
  },
  filterChipText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.text.secondary,
  },
  filterChipTextActive: {
    color: Colors.common.white,
  },
  listContent: {
    paddingHorizontal: Layout.spacing.m,
    paddingBottom: Layout.spacing.xxl,
  },
});