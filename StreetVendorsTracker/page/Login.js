import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

import {
    GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

import { useAuth } from '../contexts/Auth';

export default function Login() {

    const { loading, SignInWithGoogle } = useAuth();

    return (
        <View
            style={styles.content}
        >
            <Text style={styles.text} >Bienvenue sur Street Vendors Tracker</Text>
            <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={() => SignInWithGoogle()}
                disabled={loading} />
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: "rgba(247,246,238 ,1)"
    },
    text: {
        fontSize: 20,
        padding: 20,
        textAlign: 'center',
        backgroundColor: "rgba(214,243,172,1)",
        shadowColor: "rgba(190,202,173,1)",
        shadowOffset: {
            height: 3,
            width: 0
        },
        elevation: 9,
        shadowOpacity: 1,
        shadowRadius: 3,
        color: 'black',
        borderRadius: 25
    }
});