import {
    User,
    UserCredential,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../auth/createBase";

export interface IAuthContextType {
  user: User | null;
  createUser: (user: IUser) => Promise<UserCredential>;
  signInUser: (user: IUser) => Promise<UserCredential>;
  signOut: () => Promise<void>;
  sendEmailVerificationToUser: (user: User) => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
}

export interface IUser {
  email: string;
  password: string;
}

const AuthContext = React.createContext<IAuthContextType | null>(null);

export const AuthContextProivder = ({ children }: { children: any }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const createUser = (user: IUser) => {
    return createUserWithEmailAndPassword(auth, user.email, user.password);
  };

  const sendEmailVerificationToUser = (user: User) => {
    return sendEmailVerification(user);
  };

  const signInUser = (user: IUser) => {
    return signInWithEmailAndPassword(auth, user.email, user.password);
  };

  const signOut = () => {
    return auth.signOut();
  };

  const sendPasswordReset = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
    });

    return () => {
      unsubscribe;
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        createUser: createUser,
        signInUser: signInUser,
        signOut: signOut,
        sendEmailVerificationToUser: sendEmailVerificationToUser,
        sendPasswordReset: sendPasswordReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const authContext = () => {
  return useContext(AuthContext);
};
