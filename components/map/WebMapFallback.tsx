import { StyleSheet, View, Text } from 'react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { MapPin } from 'lucide-react-native';

export function WebMapFallback() {
  return (
    <View style={styles.container}>
      <MapPin size={64} color={Colors.grey[300]} />
      <Text style={styles.title}>Carte non disponible</Text>
      <Text style={styles.message}>
        La vue carte n'est pas disponible sur navigateur web.
        Veuillez utiliser l'application mobile pour accéder à cette fonctionnalité.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacing.l,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.text.primary,
    marginTop: Layout.spacing.m,
    marginBottom: Layout.spacing.s,
  },
  message: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
});