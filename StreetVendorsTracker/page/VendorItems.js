import React from 'react';

import { View, Text, Button, FlatList } from 'react-native';

import { useStand } from '../contexts/Stand';


export default function VendorItems({ navigation }) {

    const { items } = useStand()

    return (
        <View>
            <Text>Vendor Items page</Text>
            <Button
                title="Add item"
                color="#841584"
                onPress={() => navigation.navigate('Create item')}
            />
            <FlatList
                data={items}
                renderItem={({item}) => {
                    return (
                        <Text>{item.name}</Text>
                    )
                }}
                keyExtractor={item => item.id}
            />
        </View>
    )
}