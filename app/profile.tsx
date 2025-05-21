import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Text, Switch } from 'react-native';
import { useState } from 'react';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useNotifications } from '@/contexts/NotificationContext';
import { Button } from '@/components/ui/Button';
import { TextInput } from '@/components/ui/TextInput';
import { Camera, LogOut, Bell, Shield, Key, MapPin, Ruler, Scale, CreditCard, Car } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const { user, signOut, updateProfile } = useAuth();
  const { notificationsEnabled, toggleNotifications } = useNotifications();
  
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [cin, setCin] = useState(user?.cin || '');
  const [region, setRegion] = useState(user?.region || '');
  const [weight, setWeight] = useState(user?.weight?.toString() || '');
  const [height, setHeight] = useState(user?.height?.toString() || '');
  const [hasDrivingLicense, setHasDrivingLicense] = useState(user?.hasDrivingLicense || false);
  const [hasVehicle, setHasVehicle] = useState(user?.hasVehicle || false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      try {
        await updateProfile({ photo: result.assets[0].uri });
      } catch (error) {
        console.error('Error updating profile photo:', error);
      }
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await updateProfile({
        fullName,
        cin,
        region,
        weight: weight ? parseInt(weight, 10) : null,
        height: height ? parseInt(height, 10) : null,
        hasDrivingLicense,
        hasVehicle,
      });
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.photoContainer} onPress={pickImage}>
          {user?.photo ? (
            <Image source={{ uri: user.photo }} style={styles.photo} />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Camera size={32} color={Colors.grey[400]} />
            </View>
          )}
          <View style={styles.editBadge}>
            <Camera size={16} color={Colors.common.white} />
          </View>
        </TouchableOpacity>

        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informations personnelles</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            label="Nom complet"
            value={fullName}
            onChangeText={setFullName}
            leftIcon="user"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            label="CIN"
            value={cin}
            onChangeText={setCin}
            leftIcon={<CreditCard size={20} color={Colors.grey[500]} />}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            label="Région"
            value={region}
            onChangeText={setRegion}
            leftIcon={<MapPin size={20} color={Colors.grey[500]} />}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputContainer, styles.halfWidth]}>
            <TextInput
              label="Poids (kg)"
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
              leftIcon={<Scale size={20} color={Colors.grey[500]} />}
            />
          </View>

          <View style={[styles.inputContainer, styles.halfWidth]}>
            <TextInput
              label="Taille (cm)"
              value={height}
              onChangeText={setHeight}
              keyboardType="numeric"
              leftIcon={<Ruler size={20} color={Colors.grey[500]} />}
            />
          </View>
        </View>

        <View style={styles.switchContainer}>
          <View style={styles.switchLabel}>
            <Car size={20} color={Colors.grey[500]} />
            <Text style={styles.switchText}>Permis de conduire</Text>
          </View>
          <Switch
            value={hasDrivingLicense}
            onValueChange={setHasDrivingLicense}
            trackColor={{ false: Colors.grey[300], true: Colors.primary.light }}
            thumbColor={hasDrivingLicense ? Colors.primary.main : Colors.grey[100]}
          />
        </View>

        <View style={styles.switchContainer}>
          <View style={styles.switchLabel}>
            <Car size={20} color={Colors.grey[500]} />
            <Text style={styles.switchText}>Véhicule personnel</Text>
          </View>
          <Switch
            value={hasVehicle}
            onValueChange={setHasVehicle}
            trackColor={{ false: Colors.grey[300], true: Colors.primary.light }}
            thumbColor={hasVehicle ? Colors.primary.main : Colors.grey[100]}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Paramètres</Text>

        <View style={styles.switchContainer}>
          <View style={styles.switchLabel}>
            <Bell size={20} color={Colors.grey[500]} />
            <Text style={styles.switchText}>Notifications</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
            trackColor={{ false: Colors.grey[300], true: Colors.primary.light }}
            thumbColor={notificationsEnabled ? Colors.primary.main : Colors.grey[100]}
          />
        </View>

        <TouchableOpacity style={styles.menuItem}>
          <Shield size={20} color={Colors.grey[500]} />
          <Text style={styles.menuText}>Confidentialité</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Key size={20} color={Colors.grey[500]} />
          <Text style={styles.menuText}>Changer le mot de passe</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Enregistrer les modifications"
          onPress={handleSave}
          loading={loading}
          style={styles.saveButton}
        />

        <Button
          title="Se déconnecter"
          onPress={signOut}
          variant="outlined"
          icon={<LogOut size={20} color={Colors.primary.main} />}
          style={styles.logoutButton}
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
  header: {
    alignItems: 'center',
    padding: Layout.spacing.xl,
    backgroundColor: Colors.background.paper,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  photoContainer: {
    position: 'relative',
    marginBottom: Layout.spacing.m,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.grey[200],
    justifyContent: 'center',
    alignItems: 'center',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary.main,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.background.paper,
  },
  email: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.text.secondary,
  },
  section: {
    padding: Layout.spacing.m,
    backgroundColor: Colors.background.paper,
    marginBottom: Layout.spacing.m,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.text.primary,
    marginBottom: Layout.spacing.m,
  },
  inputContainer: {
    marginBottom: Layout.spacing.m,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Layout.spacing.s,
    marginBottom: Layout.spacing.s,
  },
  switchLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.text.primary,
    marginLeft: Layout.spacing.s,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Layout.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  menuText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.text.primary,
    marginLeft: Layout.spacing.s,
  },
  buttonContainer: {
    padding: Layout.spacing.m,
  },
  saveButton: {
    marginBottom: Layout.spacing.m,
  },
  logoutButton: {
    marginBottom: Layout.spacing.xxl,
  },
});