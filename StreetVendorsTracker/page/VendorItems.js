import React from 'react';

import { View, Text , Button } from 'react-native';

export default function VendorItems({ navigation }) {
    return (
        <View>
            <Text>Vendor Items page</Text>
            <Button
                title="Menu"
                color="#841584"
                onPress={() => navigation.navigate('Create item')}
            />
        </View>
    )
}