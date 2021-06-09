import React, { useEffect } from 'react';

import { View, Text } from 'react-native';

import {
    GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

import { useAuth } from '../contexts/Auth';

export default function Login() {

    const { user, loading,  SignInWithGoogle} = useAuth();

    useEffect(() => {
        console.log("user: ", user);
    }, [user])

    useEffect(() => {
        console.log("loading: ", loading);
    }, [loading])

    return (
        <View>
            <Text>Login page</Text>
            <Text>Loading {loading}</Text>
            <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={() => SignInWithGoogle()}
                disabled={loading} />
        </View>
    )
}