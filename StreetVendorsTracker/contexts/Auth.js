import React, { useState, useEffect, useContext, createContext } from 'react';

const authContext = createContext();

export function AuthProvider({ children }) {
    const auth = useFirebaseAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

function useFirebaseAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    

    return {
        user,
        loading,
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