import React, { useEffect } from 'react';

import { View, Text } from 'react-native';

import { useStand } from '../contexts/Stand';
import { usePosition } from '../contexts/Position';

import MapView from "react-native-maps";


export default function PositionVendors() {

    const { positionStand, setPositonStand, saveStandInformation } = useStand();

    const { position, hasLocationPermission, askLocationPermission, trackUser, unTrackUser } = usePosition();

    useEffect(() => {
        askLocationPermission();
    }, []);

    useEffect(() => {
        if (hasLocationPermission) {
            trackUser();
        }
        return unTrackUser();
    },[hasLocationPermission]);


    useEffect(() => {
        console.log( "position stand = ", positionStand);
    }, [positionStand]);

    useEffect(() => {
        console.log( "position user = ", position);
    }, [position]);


    return (
        <View>
            <Text>PositionVendors page</Text>
            <MapView
                style={{ height: 500, width: 350 }}
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