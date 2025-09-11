import { useSetLoading, useSetUser } from '@/store/user';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from 'firebase/auth';
import { Alert } from 'react-native';

export const useAuthActions = () => {
  const setUser = useSetUser();
  const setLoading = useSetLoading();

  const handleLogin = async (
    auth: Auth,
    email: string,
    password: string
  ): Promise<{ success: boolean; user?: User | null; error?: string }> => {
    console.log(`Signing in with ${email}`);
    try {
      console.log('About to sign in...');
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('Sign in successful');
      const userInfo = result.user;
      console.log(`User signed in: ${userInfo}`);
      setUser({
        uid: userInfo.uid,
        email: userInfo.email,
        displayName: userInfo.displayName,
        photoURL: userInfo.photoURL,
        providerId: userInfo.providerId,
      });
      return { success: true, user: result.user };
    } catch (error: any) {
      Alert.alert('Login Error', error.message);
      return { success: false, error: error.message };
    }
  };

  const handleSignUp = async (
    auth: Auth,
    email: string,
    password: string
  ): Promise<{ success: boolean; user?: User | null; error?: string; emailInUse?: boolean }> => {
    console.log(`Signing up with ${email}`);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log(`User created: ${result}`);
      const userInfo = result.user
      setUser({
        uid: userInfo.uid,
        email: userInfo.email,
        displayName: userInfo.displayName,
        photoURL: userInfo.photoURL,
        providerId: userInfo.providerId,
      });
      return { success: true, user: result.user };
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert(
          'Account Exists',
          'This email is already registered. Please sign in instead.'
        );
        return { success: false, error: error.message, emailInUse: true };
      } else {
        Alert.alert('Sign Up Error', error.message);
        return { success: false, error: error.message };
      }
    }
  };

  return { handleLogin, handleSignUp };
};
