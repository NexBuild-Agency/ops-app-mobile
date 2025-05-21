import { StyleSheet, Text, View } from 'react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { Feather } from '@expo/vector-icons';
import { Button } from './Button';

interface EmptyStateProps {
  icon: string;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState = ({
  icon,
  title,
  message,
  actionLabel,
  onAction,
}: EmptyStateProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Feather name={icon as any} size={64} color={Colors.grey[300]} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {actionLabel && onAction && (
        <Button
          title={actionLabel}
          onPress={onAction}
          style={styles.actionButton}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacing.l,
    minHeight: 300,
  },
  iconContainer: {
    marginBottom: Layout.spacing.l,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.text.primary,
    marginBottom: Layout.spacing.s,
    textAlign: 'center',
  },
  message: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Layout.spacing.l,
  },
  actionButton: {
    minWidth: 200,
  },
});