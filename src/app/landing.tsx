import { AuthType } from '@/types/auth';
import { Routes } from '@/types/router';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LandingScreen() {
  const router = useRouter();

  const handleButtonPress = (authType: AuthType) => {
    router.push({ pathname: Routes.LOGIN, params: { authType } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Split the Bill</Text>
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => handleButtonPress(AuthType.SIGNUP)}
      >
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signInButton}
        onPress={() => handleButtonPress(AuthType.LOGIN)}
      >
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  signUpButton: {
    backgroundColor: '#0a7ea4',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: 200,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  signInButton: {
    borderColor: '#0a7ea4',
    borderWidth: 2,
    padding: 16,
    borderRadius: 8,
    width: 200,
  },
  signInButtonText: {
    color: '#0a7ea4',
    fontSize: 18,
    textAlign: 'center',
  },
});
