import React from 'react';

import { View, Text } from 'react-native';

import MapView from "react-native-maps";

export default function Discover() {
    return (
        <View>
            <Text>Discover page</Text>
            <MapView
                style={{ height: 100, width: 100 }}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05
                }}
            />
        </View>
    )
}