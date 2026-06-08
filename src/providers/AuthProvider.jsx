import {
  createContext,
  useEffect,
  useState,
} from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
  };

  // Login
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  };

  // Google Login
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(
      auth,
      googleProvider
    );
  };

  // Update Profile
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // Reset Password
  const resetPassword = (email) => {
    return sendPasswordResetEmail(
      auth,
      email
    );
  };

  // Logout
  const logoutUser = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    registerUser,
    loginUser,
    googleLogin,
    logoutUser,
    updateUserProfile,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;