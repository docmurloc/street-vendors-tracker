import React from 'react';

import { View, Text, Button, FlatList } from 'react-native';

export default function VendorInformation({ route, navigation }) {

    const { name } = route.params;

    return (
        <View>
            <Text>Vendor Information page</Text>
            <Text>{name}</Text>
        </View>
    )
}