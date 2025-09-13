// Firebase Authentication Service
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
  updateProfile,
  UserCredential
} from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

// UI feedback components
import { toast } from 'sonner';
import { AlertDialog } from '../components/ui/alert-dialog';

const googleProvider = new GoogleAuthProvider();

// Helper to show error
const showError = (message: string) => {
  toast.error(message);
  // Optionally show dialog for critical errors
  // <AlertDialog open={true} title="Error" description={message} />
};

export const signUpWithEmailPassword = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    toast.success('Account created successfully!');
    return userCredential;
  } catch (error: any) {
    showError(error.message || 'Failed to create account');
    throw new Error(error.message || 'Failed to create account');
  }
};

export const loginWithEmailPassword = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    toast.success('Logged in successfully!');
    return userCredential;
  } catch (error: any) {
    showError(error.message || 'Failed to log in');
    throw new Error(error.message || 'Failed to log in');
  }
};

export const loginWithGoogle = async (): Promise<UserCredential> => {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    toast.success('Google sign-in successful!');
    return userCredential;
  } catch (error: any) {
    showError(error.message || 'Failed to sign in with Google');
    throw new Error(error.message || 'Failed to sign in with Google');
  }
};

export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
    toast.success('Logged out successfully!');
  } catch (error: any) {
    showError(error.message || 'Failed to log out');
    throw new Error(error.message || 'Failed to log out');
  }
};

export const updateUserProfile = async (displayName: string): Promise<void> => {
  try {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName });
      toast.success('Profile updated!');
    } else {
      throw new Error('No user logged in');
    }
  } catch (error: any) {
    showError(error.message || 'Failed to update profile');
    throw new Error(error.message || 'Failed to update profile');
  }
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

export const isAuthenticated = (): boolean => {
  return !!auth.currentUser;
};