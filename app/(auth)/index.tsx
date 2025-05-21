import { View, StyleSheet, Image, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { TextInput } from '@/components/ui/TextInput';
import { Button } from '@/components/ui/Button';
import { Feather } from '@expo/vector-icons';

export default function LoginScreen() {
  const [email, setEmail] = useState('contact@novalabs.tn');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await signIn(email, password);
    } catch (err) {
      setError('Identifiants incorrects. Veuillez réessayer.');
      console.error('Login error:', err);
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
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/7948044/pexels-photo-7948044.jpeg' }}
            style={styles.logoBackground}
          />
          <View style={styles.overlay} />
          <Text style={styles.logoText}>OPS APP</Text>
          <Text style={styles.tagline}>Gestion d'opérations en grande surface</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.welcomeText}>Bienvenue</Text>
          <Text style={styles.subtitleText}>Connectez-vous pour continuer</Text>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon="mail"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Mot de passe"
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

          <TouchableOpacity
            style={styles.forgotPasswordContainer}
            onPress={() => router.push('/forgot-password')}
          >
            <Text style={styles.forgotPasswordText}>Mot de passe oublié?</Text>
          </TouchableOpacity>

          <Button
            title="Se connecter"
            onPress={handleLogin}
            loading={loading}
            style={styles.loginButton}
          />

          <TouchableOpacity
            style={styles.signupContainer}
            onPress={() => router.push('/signup')}
          >
            <Text style={styles.signupText}>
              Pas encore de compte? <Text style={styles.signupLink}>S'inscrire</Text>
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
  logoContainer: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  logoBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  logoText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: Colors.common.white,
    marginBottom: 5,
  },
  tagline: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.common.white,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: Layout.spacing.l,
    paddingTop: Layout.spacing.xl,
    paddingBottom: Layout.spacing.l,
    backgroundColor: Colors.background.default,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
  },
  welcomeText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  subtitleText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: Layout.spacing.l,
  },
  inputContainer: {
    marginBottom: Layout.spacing.m,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: Layout.spacing.l,
  },
  forgotPasswordText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary.main,
  },
  loginButton: {
    marginTop: Layout.spacing.m,
  },
  signupContainer: {
    alignItems: 'center',
    marginTop: Layout.spacing.l,
  },
  signupText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
  },
  signupLink: {
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