import { AuthType } from '@/types/auth';
import { Routes } from '@/types/router';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuthActions } from '../hooks/useAuth';
import { auth } from '../utils/firebase';

export default function LoginScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const user = auth.currentUser;
  const [email, setEmail] = useState('');
  const { handleLogin: authLogin, handleSignUp: authSignUp } = useAuthActions();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    if (user) {
      router.replace(Routes.DASHBOARD);
    }
    if (params.authType === AuthType.SIGNUP) {
      setIsSignUp(true);
    } else {
      setIsSignUp(false);
    }
  }, [params.authType]);

  const handleLogin = async () => {
    setLoading(true);
    let authEmail = email;
    let authPassword = password;
    if (email.length === 0) {
      authEmail = 'example@test.com';
      authPassword = 'Test123!';
    }
    const result = await authLogin(auth, authEmail, authPassword);
    setLoading(false);
    if (result.success && result.user) {
      router.replace(Routes.DASHBOARD);
    } else if (result.error) {
      Alert.alert('Login Error', result.error);
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    const result = await authSignUp(auth, email, password);
    setLoading(false);
    if (result.success && result.user) {
      router.replace(Routes.DASHBOARD);
    } else if (result.emailInUse) {
      setIsSignUp(false);
    } else if (result.error) {
      Alert.alert('Sign Up Error', result.error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>{isSignUp ? 'Sign Up' : 'Login'}</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input} />
      <Button
        title={loading 
          ? (isSignUp ? 'Signing up...' : 'Logging in...')
          : (isSignUp ? 'Sign Up' : 'Login')}
        onPress={isSignUp ? handleSignUp : handleLogin}
        disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 200,
    margin: 8,
    borderWidth: 1,
  },
});
