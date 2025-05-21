import { View, StyleSheet, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect } from 'react';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { EmptyState } from '@/components/ui/EmptyState';
import { Calendar, MapPin, CircleCheck, Bell, Package2 } from 'lucide-react-native';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

type NotificationType = 'event' | 'pointage' | 'candidature' | 'stock' | 'system';

interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  image?: string;
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    type: 'event',
    title: 'Nouvel événement disponible',
    message: 'Promotion Carrefour - Animation produits laitiers',
    timestamp: '2025-04-18T08:00:00Z',
    read: false,
    image: 'https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg',
  },
  {
    id: 2,
    type: 'pointage',
    title: 'Pointage validé',
    message: 'Votre pointage du 17/04/2025 a été validé',
    timestamp: '2025-04-17T14:30:00Z',
    read: false,
  },
  {
    id: 3,
    type: 'candidature',
    title: 'Candidature acceptée',
    message: 'Votre candidature pour l\'événement "Dégustation Monoprix" a été acceptée',
    timestamp: '2025-04-16T09:15:00Z',
    read: true,
    image: 'https://images.pexels.com/photos/2280551/pexels-photo-2280551.jpeg',
  },
];

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // In real app, fetch from API
    setNotifications(mockNotifications);
  }, []);

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'event':
        return <Calendar size={24} color={Colors.primary.main} />;
      case 'pointage':
        return <CircleCheck size={24} color={Colors.success.main} />;
      case 'candidature':
        return <MapPin size={24} color={Colors.info.main} />;
      case 'stock':
        return <Package2 size={24} color={Colors.warning.main} />;
      default:
        return <Bell size={24} color={Colors.grey[500]} />;
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        !item.read && styles.unreadNotification
      ]}
      onPress={() => markAsRead(item.id)}
    >
      <View style={styles.iconContainer}>
        {getIcon(item.type)}
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
        
        {item.image && (
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        
        <Text style={styles.timestamp}>
          {format(new Date(item.timestamp), 'dd MMMM yyyy à HH:mm', { locale: fr })}
        </Text>
      </View>
      
      {!item.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <EmptyState
            icon="bell"
            title="Aucune notification"
            message="Vous n'avez pas encore reçu de notifications"
          />
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
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: Colors.background.paper,
    borderRadius: Layout.borderRadius.medium,
    padding: Layout.spacing.m,
    marginBottom: Layout.spacing.m,
    position: 'relative',
  },
  unreadNotification: {
    backgroundColor: `${Colors.primary.main}08`,
  },
  iconContainer: {
    marginRight: Layout.spacing.m,
    padding: Layout.spacing.s,
    backgroundColor: Colors.grey[100],
    borderRadius: Layout.borderRadius.medium,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.text.primary,
    marginBottom: Layout.spacing.xs,
  },
  message: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: Layout.spacing.s,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: Layout.borderRadius.medium,
    marginBottom: Layout.spacing.s,
  },
  timestamp: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.text.secondary,
  },
  unreadDot: {
    position: 'absolute',
    top: Layout.spacing.m,
    right: Layout.spacing.m,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary.main,
  },
});