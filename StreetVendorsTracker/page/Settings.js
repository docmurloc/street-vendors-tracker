import React from 'react';

import { View, Text, Button } from 'react-native';

import { useAuth } from '../contexts/Auth';

export default function Settings({ navigation }) {

    const { SignOut } = useAuth();

    return (
        <View>
            <Text>Settings page</Text>
            <Button
            title="Profile"
            onPress={() => navigation.navigate('Profile')}
            />
            <Button
            title="Your stand"
            onPress={() => navigation.navigate('Vendors')}
            />
            <Button
            title="Command"
            onPress={() => navigation.navigate('Vendors')}
            />
            <Button
            title="Panier"
            onPress={() => navigation.navigate('Vendors')}
            />
            <Button
            title="Sign out"
            onPress={() => SignOut()}
            />
        </View>
    )
}