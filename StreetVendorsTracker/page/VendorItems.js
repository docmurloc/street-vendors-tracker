import React from 'react';

import { View, Text , Button } from 'react-native';

export default function VendorItems({ navigation }) {
    return (
        <View>
            <Text>Vendor Items page</Text>
            <Button
                title="Add item"
                color="#841584"
                onPress={() => navigation.navigate('Create item')}
            />
        </View>
    )
}