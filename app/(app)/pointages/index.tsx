import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { usePointages } from '@/hooks/usePointages';
import { PointageCard } from '@/components/pointages/PointageCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { Camera } from 'lucide-react-native';

export default function PointagesScreen() {
  const { pointages, loadPointages, isLoading } = usePointages();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadPointages();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadPointages();
    setRefreshing(false);
  };

  const handleNewPointage = () => {
    router.push('/pointages/nouveau');
  };

  const handlePointagePress = (id: number) => {
    router.push(`/pointages/details?id=${id}`);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={pointages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PointageCard
            pointage={item}
            onPress={() => handlePointagePress(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListEmptyComponent={
          !isLoading ? (
            <EmptyState
              icon="check-circle"
              title="Aucun pointage"
              message="Vous n'avez pas encore effectué de pointage"
              actionLabel="Nouveau pointage"
              onAction={handleNewPointage}
            />
          ) : null
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={handleNewPointage}
        activeOpacity={0.8}
      >
        <Camera size={24} color={Colors.common.white} />
      </TouchableOpacity>
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
    paddingBottom: Layout.spacing.xxl,
  },
  fab: {
    position: 'absolute',
    right: Layout.spacing.l,
    bottom: Layout.spacing.l,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.grey[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
  },
});