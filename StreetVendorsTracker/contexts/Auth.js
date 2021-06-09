import React, { useState, useEffect, useContext, createContext } from 'react';

import auth from '@react-native-firebase/auth';

import {
    GoogleSignin,
} from '@react-native-google-signin/google-signin';
  

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
            webClientId: '344872025261-d74vtdh3kq3sf4lioc6va7ldjagcqqsk.apps.googleusercontent.com',
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

    

    return {
        user,
        loading,
        SignInWithGoogle
    };
}

const formatUser = (user) => {

    const newUser = {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        provider: user.providerData[0].providerId,
        photoUrl: user.photoURL,
    };

    firebase.database().ref('users/' + user.uid).update(newUser);

    return newUser;
};