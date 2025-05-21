import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, FlatList, ScrollView, Platform } from 'react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { useLieux } from '@/hooks/useLieux';
import { Lieu } from '@/types';
import { EmptyState } from '@/components/ui/EmptyState';
import { TextInput } from '@/components/ui/TextInput';
import { Feather } from '@expo/vector-icons';
import { LieuListItem } from '@/components/map/LieuListItem';

export default function MapScreen() {
  const { lieux, loadLieux, isLoading, error } = useLieux();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRegion, setFilterRegion] = useState<string | null>(null);
  const [selectedLieu, setSelectedLieu] = useState<Lieu | null>(null);

  useEffect(() => {
    loadLieux();
  }, []);

  const filteredLieux = lieux.filter(lieu => {
    const matchesSearch = searchQuery === '' || 
      lieu.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lieu.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRegion = filterRegion === null || lieu.region === filterRegion;
    
    return matchesSearch && matchesRegion;
  });

  const regions = [...new Set(lieux.map(lieu => lieu.region))].sort();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Rechercher un lieu..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            leftIcon="search"
            style={styles.searchInput}
          />
        </View>
        
        <View style={styles.filtersContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersScroll}
          >
            <TouchableOpacity
              style={[
                styles.filterChip,
                filterRegion === null && styles.filterChipActive
              ]}
              onPress={() => setFilterRegion(null)}
            >
              <Text style={[
                styles.filterChipText,
                filterRegion === null && styles.filterChipTextActive
              ]}>
                Toutes les régions
              </Text>
            </TouchableOpacity>
            
            {regions.map(region => (
              <TouchableOpacity
                key={region}
                style={[
                  styles.filterChip,
                  filterRegion === region && styles.filterChipActive
                ]}
                onPress={() => setFilterRegion(region)}
              >
                <Text style={[
                  styles.filterChipText,
                  filterRegion === region && styles.filterChipTextActive
                ]}>
                  {region}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      <View style={styles.mapImageContainer}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/4429279/pexels-photo-4429279.jpeg' }}
          style={styles.mapImage}
          resizeMode="cover"
        />
        <View style={styles.mapOverlay}>
          <Feather name="map" size={48} color={Colors.common.white} />
          <Text style={styles.mapTitle}>Carte des points de vente</Text>
          <Text style={styles.mapSubtitle}>
            {filteredLieux.length} {filteredLieux.length > 1 ? 'lieux disponibles' : 'lieu disponible'}
          </Text>
        </View>
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Liste des points de vente</Text>
        <FlatList
          data={filteredLieux}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <LieuListItem
              lieu={item}
              selected={selectedLieu?.id === item.id}
              onPress={() => setSelectedLieu(item)}
            />
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            !isLoading ? (
              <EmptyState
                icon="map-pin"
                title="Aucun lieu trouvé"
                message="Aucun lieu ne correspond à vos critères de recherche"
                actionLabel={filterRegion !== null ? "Voir tous" : undefined}
                onAction={filterRegion !== null ? () => setFilterRegion(null) : undefined}
              />
            ) : null
          }
        />
      </View>
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
  },
  searchContainer: {
    marginBottom: Layout.spacing.m,
  },
  searchInput: {
    flex: 1,
  },
  filtersContainer: {
    marginBottom: Layout.spacing.xs,
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
  mapImageContainer: {
    height: 200,
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: Colors.common.white,
    marginTop: Layout.spacing.m,
  },
  mapSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.common.white,
    marginTop: Layout.spacing.xs,
  },
  listContainer: {
    flex: 1,
    padding: Layout.spacing.m,
  },
  listTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.text.primary,
    marginBottom: Layout.spacing.m,
  },
  listContent: {
    paddingBottom: Layout.spacing.xxl,
  },
});