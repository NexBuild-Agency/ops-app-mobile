import { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Image, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { Button } from '@/components/ui/Button';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { usePointages } from '@/hooks/usePointages';

export default function NouveauPointageScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [locationPermission, requestLocationPermission] = useState<boolean | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const cameraRef = useRef<any>(null);
  const { addPointage } = usePointages();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      requestLocationPermission(status === 'granted');
      
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      }
    })();
  }, []);

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      setLoading(true);
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setPhoto(photo.uri);
      } catch (error) {
        console.error('Error taking photo:', error);
        Alert.alert('Erreur', 'Impossible de prendre une photo. Veuillez réessayer.');
      } finally {
        setLoading(false);
      }
    }
  };

  const retakePhoto = () => {
    setPhoto(null);
  };

  const savePointage = async () => {
    if (!photo) {
      Alert.alert('Erreur', 'Veuillez prendre une photo');
      return;
    }

    if (!location) {
      Alert.alert('Erreur', 'Position GPS non disponible. Veuillez activer votre GPS et réessayer.');
      return;
    }

    try {
      setIsSaving(true);
      
      await addPointage({
        photo: photo,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        timestamp: new Date().toISOString(),
      });
      
      router.replace('/pointages');
    } catch (error) {
      console.error('Error saving pointage:', error);
      Alert.alert('Erreur', 'Impossible de sauvegarder le pointage. Veuillez réessayer.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!permission) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary.main} />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <MaterialIcons name="camera-alt" size={64} color={Colors.grey[400]} />
        <Text style={styles.permissionText}>
          Nous avons besoin de votre permission pour utiliser la caméra
        </Text>
        <Button onPress={requestPermission} title="Autoriser l'accès" />
      </View>
    );
  }

  if (locationPermission === false) {
    return (
      <View style={styles.permissionContainer}>
        <MaterialIcons name="location-on" size={64} color={Colors.grey[400]} />
        <Text style={styles.permissionText}>
          Nous avons besoin de votre permission pour accéder à votre position
        </Text>
        <Button 
          onPress={async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            requestLocationPermission(status === 'granted');
          }} 
          title="Autoriser l'accès" 
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {photo ? (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.previewContainer}>
            <Text style={styles.previewTitle}>Aperçu du pointage</Text>
            <Image source={{ uri: photo }} style={styles.previewImage} />
            
            <TouchableOpacity 
              style={styles.retakeButton}
              onPress={retakePhoto}
            >
              <Feather name="camera" size={20} color={Colors.primary.main} />
              <Text style={styles.retakeButtonText}>Reprendre la photo</Text>
            </TouchableOpacity>
          </View>

          {location && (
            <View style={styles.locationContainer}>
              <Text style={styles.locationTitle}>Position GPS</Text>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/4429279/pexels-photo-4429279.jpeg' }}
                style={styles.locationImage}
                resizeMode="cover"
              />
              <View style={styles.coordsContainer}>
                <Text style={styles.coordsText}>
                  Lat: {location.coords.latitude.toFixed(6)}
                </Text>
                <Text style={styles.coordsText}>
                  Long: {location.coords.longitude.toFixed(6)}
                </Text>
              </View>
            </View>
          )}

          <Button
            title="Envoyer le pointage"
            onPress={savePointage}
            loading={isSaving}
            style={styles.saveButton}
            icon={<Feather name="check-circle" size={20} color="white" />}
          />
        </ScrollView>
      ) : (
        <View style={styles.cameraContainer}>
          <CameraView
            style={styles.camera}
            facing={facing}
            ref={cameraRef}
          >
            <View style={styles.cameraButtonsContainer}>
              <TouchableOpacity
                style={styles.flipButton}
                onPress={toggleCameraFacing}
              >
                <Feather name="refresh-cw" size={24} color="white" />
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.captureButton}
                onPress={takePhoto}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="large" color="white" />
                ) : (
                  <View style={styles.captureButtonInner} />
                )}
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => router.back()}
              >
                <Feather name="x" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </CameraView>
          
          <View style={styles.cameraInstructions}>
            <Text style={styles.instructionText}>
              Prenez une photo claire du lieu de pointage
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.default,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacing.l,
  },
  permissionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginTop: Layout.spacing.m,
    marginBottom: Layout.spacing.l,
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraButtonsContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    marginBottom: 40,
  },
  flipButton: {
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 12,
    borderRadius: 30,
  },
  captureButton: {
    alignSelf: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  closeButton: {
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 12,
    borderRadius: 30,
  },
  cameraInstructions: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    padding: Layout.spacing.m,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  instructionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
  scrollContainer: {
    padding: Layout.spacing.m,
  },
  previewContainer: {
    marginBottom: Layout.spacing.l,
  },
  previewTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: Colors.text.primary,
    marginBottom: Layout.spacing.m,
  },
  previewImage: {
    width: '100%',
    height: 300,
    borderRadius: Layout.borderRadius.medium,
    marginBottom: Layout.spacing.m,
  },
  retakeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.spacing.m,
  },
  retakeButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.primary.main,
    marginLeft: Layout.spacing.xs,
  },
  locationContainer: {
    marginBottom: Layout.spacing.l,
  },
  locationTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: Colors.text.primary,
    marginBottom: Layout.spacing.m,
  },
  locationImage: {
    width: '100%',
    height: 200,
    borderRadius: Layout.borderRadius.medium,
    marginBottom: Layout.spacing.m,
  },
  coordsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.grey[100],
    padding: Layout.spacing.m,
    borderRadius: Layout.borderRadius.medium,
  },
  coordsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
  },
  saveButton: {
    marginTop: Layout.spacing.m,
    marginBottom: Layout.spacing.xxl,
  },
});