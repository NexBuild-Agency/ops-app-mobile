import { View, StyleSheet, Image, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Switch } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { TextInput } from '@/components/ui/TextInput';
import { Button } from '@/components/ui/Button';
import { Feather } from '@expo/vector-icons';

type UserRole = 'animateur' | 'superviseur';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [cin, setCin] = useState('');
  const [region, setRegion] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [hasDrivingLicense, setHasDrivingLicense] = useState(false);
  const [hasVehicle, setHasVehicle] = useState(false);
  const [role, setRole] = useState<UserRole>('animateur');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signIn } = useAuth();

  const handleSignUp = async () => {
    if (!email || !phone || !password || !confirmPassword || !fullName || !cin || !region) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      // Simulate API call for registration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // After successful registration, log in automatically
      await signIn(email, password);
      router.replace('/(app)');
    } catch (err) {
      setError('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
      console.error('Sign up error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={24} color={Colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Inscription</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Créer un compte</Text>
          <Text style={styles.subtitle}>
            Rejoignez notre équipe d'opérations
          </Text>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Text style={styles.sectionTitle}>Type de compte</Text>
          
          <View style={styles.roleContainer}>
            <TouchableOpacity
              style={[
                styles.roleButton,
                role === 'animateur' && styles.roleButtonActive
              ]}
              onPress={() => setRole('animateur')}
            >
              <Feather 
                name="user" 
                size={24} 
                color={role === 'animateur' ? Colors.common.white : Colors.text.primary} 
              />
              <Text style={[
                styles.roleButtonText,
                role === 'animateur' && styles.roleButtonTextActive
              ]}>
                Animateur
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roleButton,
                role === 'superviseur' && styles.roleButtonActive
              ]}
              onPress={() => setRole('superviseur')}
            >
              <Feather 
                name="shield" 
                size={24} 
                color={role === 'superviseur' ? Colors.common.white : Colors.text.primary} 
              />
              <Text style={[
                styles.roleButtonText,
                role === 'superviseur' && styles.roleButtonTextActive
              ]}>
                Superviseur
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Informations de base</Text>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Nom complet*"
              value={fullName}
              onChangeText={setFullName}
              leftIcon="user"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email*"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon="mail"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Numéro de téléphone*"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              leftIcon="phone"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Mot de passe*"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              leftIcon="lock"
              rightIcon={
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Feather name={showPassword ? 'eye-off' : 'eye'} size={20} color={Colors.grey[500]} />
                </TouchableOpacity>
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Confirmer le mot de passe*"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showPassword}
              leftIcon="lock"
            />
          </View>

          <Text style={styles.sectionTitle}>Informations personnelles</Text>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="CIN*"
              value={cin}
              onChangeText={setCin}
              keyboardType="number-pad"
              leftIcon="credit-card"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Région*"
              value={region}
              onChangeText={setRegion}
              leftIcon="map-pin"
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputContainer, styles.halfWidth]}>
              <TextInput
                placeholder="Poids (kg)"
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
                leftIcon="activity"
              />
            </View>

            <View style={[styles.inputContainer, styles.halfWidth]}>
              <TextInput
                placeholder="Taille (cm)"
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
                leftIcon="ruler"
              />
            </View>
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Permis de conduire</Text>
            <Switch
              value={hasDrivingLicense}
              onValueChange={setHasDrivingLicense}
              trackColor={{ false: Colors.grey[300], true: Colors.primary.light }}
              thumbColor={hasDrivingLicense ? Colors.primary.main : Colors.grey[100]}
            />
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Véhicule personnel</Text>
            <Switch
              value={hasVehicle}
              onValueChange={setHasVehicle}
              trackColor={{ false: Colors.grey[300], true: Colors.primary.light }}
              thumbColor={hasVehicle ? Colors.primary.main : Colors.grey[100]}
            />
          </View>

          <Button
            title="S'inscrire"
            onPress={handleSignUp}
            loading={loading}
            style={styles.signUpButton}
          />

          <TouchableOpacity
            style={styles.loginContainer}
            onPress={() => router.replace('/')}
          >
            <Text style={styles.loginText}>
              Déjà un compte? <Text style={styles.loginLink}>Se connecter</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.default,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.m,
    paddingTop: Layout.spacing.xl,
    paddingBottom: Layout.spacing.m,
  },
  backButton: {
    padding: Layout.spacing.xs,
  },
  headerTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: Colors.text.primary,
    marginLeft: Layout.spacing.m,
  },
  content: {
    flex: 1,
    paddingHorizontal: Layout.spacing.l,
    paddingTop: Layout.spacing.l,
    paddingBottom: Layout.spacing.xxl,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.text.primary,
    marginBottom: Layout.spacing.s,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: Layout.spacing.xl,
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.l,
  },
  roleButton: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.spacing.m,
    backgroundColor: Colors.grey[100],
    borderRadius: Layout.borderRadius.medium,
    marginHorizontal: Layout.spacing.xs,
  },
  roleButtonActive: {
    backgroundColor: Colors.primary.main,
  },
  roleButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.text.primary,
    marginTop: Layout.spacing.s,
  },
  roleButtonTextActive: {
    color: Colors.common.white,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.text.primary,
    marginTop: Layout.spacing.l,
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
    marginBottom: Layout.spacing.m,
  },
  switchLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text.primary,
  },
  signUpButton: {
    marginTop: Layout.spacing.l,
  },
  loginContainer: {
    alignItems: 'center',
    padding: Layout.spacing.m,
  },
  loginText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
  },
  loginLink: {
    fontFamily: 'Inter-Medium',
    color: Colors.primary.main,
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.error.main,
    marginBottom: Layout.spacing.m,
    textAlign: 'center',
  },
});