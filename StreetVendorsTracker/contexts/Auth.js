import React, { useState, useEffect, useContext, createContext } from 'react';

import auth from '@react-native-firebase/auth';

import {
    GoogleSignin,
} from '@react-native-google-signin/google-signin';

import { FIREBASE_CLIENT_KEY } from '@env';

const authContext = createContext();

export function AuthProvider({ children }) {
    const authFirebase = useFirebaseAuth();
    return <authContext.Provider value={authFirebase}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

function useFirebaseAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: FIREBASE_CLIENT_KEY,
          });
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    },[])


    const onAuthStateChanged = (dataUser) => {
        setUser(dataUser);
    }


    const SignInWithGoogle = async () => {
        setLoading(true);

        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        await auth().signInWithCredential(googleCredential);

        setLoading(false);
    }

    const SignOut = async () => {
        setLoading(true);

        await auth().signOut();

        setLoading(false);

    }

    return {
        user,
        loading,
        SignInWithGoogle,
        SignOut
    };
}