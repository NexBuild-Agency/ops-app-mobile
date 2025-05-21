import { View, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { TextInput } from '@/components/ui/TextInput';
import { Button } from '@/components/ui/Button';
import { Feather } from '@expo/vector-icons';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      setError('Veuillez entrer votre adresse email');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess(true);
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      console.error('Password reset error:', err);
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
          <Text style={styles.headerTitle}>Récupération de compte</Text>
        </View>

        <View style={styles.content}>
          {success ? (
            <View style={styles.successContainer}>
              <Feather name="check-circle" size={64} color={Colors.success.main} />
              <Text style={styles.successTitle}>Email envoyé!</Text>
              <Text style={styles.successMessage}>
                Si un compte existe avec cette adresse email, vous recevrez un lien pour réinitialiser votre mot de passe.
              </Text>
              <Button
                title="Retour à la connexion"
                onPress={() => router.replace('/')}
                style={styles.backToLoginButton}
              />
            </View>
          ) : (
            <>
              <Text style={styles.title}>Mot de passe oublié</Text>
              <Text style={styles.subtitle}>
                Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe
              </Text>

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

              <Button
                title="Envoyer le lien"
                onPress={handleResetPassword}
                loading={loading}
                style={styles.sendButton}
              />

              <TouchableOpacity
                style={styles.cancelContainer}
                onPress={() => router.back()}
              >
                <Text style={styles.cancelText}>Annuler</Text>
              </TouchableOpacity>
            </>
          )}
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
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.text.primary,
    marginBottom: Layout.spacing.m,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: Layout.spacing.l,
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: Layout.spacing.l,
  },
  sendButton: {
    marginBottom: Layout.spacing.m,
  },
  cancelContainer: {
    alignItems: 'center',
    padding: Layout.spacing.m,
  },
  cancelText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.text.secondary,
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.error.main,
    marginBottom: Layout.spacing.m,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.l,
  },
  successTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.text.primary,
    marginTop: Layout.spacing.l,
    marginBottom: Layout.spacing.m,
  },
  successMessage: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Layout.spacing.xl,
    lineHeight: 20,
  },
  backToLoginButton: {
    marginTop: Layout.spacing.m,
  },
});