import React from 'react';

import { View, Text, Button } from 'react-native';

export default function Settings({ navigation }) {
    return (
        <View>
            <Text>Settings page</Text>
            <Button
            title="Profile"
            onPress={() => navigation.navigate('Profile')}
            />
        </View>
    )
}