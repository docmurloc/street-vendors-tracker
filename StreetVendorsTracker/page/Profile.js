import React from 'react';

import { View, Text } from 'react-native';

import { useAuth } from '../contexts/Auth';

export default function Profile() {

    const { user } = useAuth();

    return (
        <View>
            <Text>Profile page</Text>
            <Text>{user.displayName}</Text>
        </View>
    )
}