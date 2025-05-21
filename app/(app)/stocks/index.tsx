import { View, StyleSheet, FlatList, Text, RefreshControl, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { useStocks } from '@/hooks/useStocks';
import { StockCard } from '@/components/stocks/StockCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { TextInput } from '@/components/ui/TextInput';
import { Search, Filter } from 'lucide-react-native';

export default function StocksScreen() {
  const { stocks, loadStocks, updateStock, isLoading } = useStocks();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  useEffect(() => {
    loadStocks();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadStocks();
    setRefreshing(false);
  };

  const handleStockUpdate = async (stockId: number, update: { usedQuantity: number }) => {
    await updateStock(stockId, update);
  };

  const filteredStocks = stocks.filter(stock => {
    const matchesSearch = searchQuery === '' || 
      stock.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.productCode.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesEvent = selectedEvent === null || stock.eventId === selectedEvent;
    
    return matchesSearch && matchesEvent;
  });

  const events = [...new Set(stocks.map(stock => stock.eventId))];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color={Colors.grey[500]} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un produit..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.grey[400]}
          />
        </View>

        <View style={styles.filtersContainer}>
          <View style={styles.filterHeader}>
            <Filter size={20} color={Colors.text.primary} />
            <Text style={styles.filterTitle}>Filtrer par événement</Text>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={events}
            keyExtractor={(item) => item.toString()}
            contentContainerStyle={styles.filtersScroll}
            renderItem={({ item }) => {
              const event = stocks.find(s => s.eventId === item)?.event;
              return (
                <TouchableOpacity
                  style={[
                    styles.filterChip,
                    selectedEvent === item && styles.filterChipActive
                  ]}
                  onPress={() => setSelectedEvent(selectedEvent === item ? null : item)}
                >
                  <Text style={[
                    styles.filterChipText,
                    selectedEvent === item && styles.filterChipTextActive
                  ]}>
                    {event?.name || `Événement ${item}`}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>

      <FlatList
        data={filteredStocks}
        renderItem={({ item }) => (
          <StockCard
            stock={item}
            onUpdate={handleStockUpdate}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={Colors.primary.main}
          />
        }
        ListEmptyComponent={
          !isLoading && (
            <EmptyState
              icon="package"
              title="Aucun stock trouvé"
              message={
                searchQuery
                  ? "Aucun produit ne correspond à votre recherche"
                  : "Aucun stock n'est disponible pour le moment"
              }
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
  header: {
    padding: Layout.spacing.m,
    backgroundColor: Colors.background.paper,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
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
    padding: Layout.spacing.m,
    paddingBottom: Layout.spacing.xxl,
  },
});