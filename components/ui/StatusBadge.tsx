import { StyleSheet, Text, View } from 'react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

type Status = 'pending' | 'accepted' | 'rejected' | 'validated' | 'en attente' | 'validé' | 'rejeté' | 'en cours';

interface StatusBadgeProps {
  status: Status;
  size?: 'small' | 'medium' | 'large';
}

export const StatusBadge = ({ status, size = 'medium' }: StatusBadgeProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'accepted':
      case 'validated':
      case 'validé':
        return Colors.statusColors.accepted;
      case 'rejected':
      case 'rejeté':
        return Colors.statusColors.rejected;
      case 'pending':
      case 'en attente':
        return Colors.statusColors.pending;
      case 'en cours':
        return Colors.statusColors.inProgress;
      default:
        return Colors.grey[500];
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'accepted':
        return 'Accepté';
      case 'rejected':
        return 'Rejeté';
      case 'pending':
        return 'En attente';
      case 'validated':
        return 'Validé';
      case 'validé':
        return 'Validé';
      case 'rejeté':
        return 'Rejeté';
      case 'en attente':
        return 'En attente';
      case 'en cours':
        return 'En cours';
      default:
        return status;
    }
  };

  return (
    <View style={[
      styles.badge,
      { backgroundColor: `${getStatusColor()}20` },
      size === 'small' && styles.badgeSmall,
      size === 'large' && styles.badgeLarge,
    ]}>
      <View style={[styles.dot, { backgroundColor: getStatusColor() }]} />
      <Text style={[
        styles.text,
        { color: getStatusColor() },
        size === 'small' && styles.textSmall,
        size === 'large' && styles.textLarge,
      ]}>
        {getStatusText()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.medium,
  },
  badgeSmall: {
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: 2,
  },
  badgeLarge: {
    paddingHorizontal: Layout.spacing.l,
    paddingVertical: Layout.spacing.s,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: Layout.spacing.xs,
  },
  text: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  textSmall: {
    fontSize: 12,
  },
  textLarge: {
    fontSize: 16,
  },
});