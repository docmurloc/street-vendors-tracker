import React from 'react';

import { View, Text, Button } from 'react-native';

import { usePosition } from '../contexts/Position';

export default function Vendors() {

    const {trackUser, unTrackUser, askLocationPermission, hasLocationPermission} = usePosition();

    const enableTrackUser = async () => {
        if (hasLocationPermission) {
            trackUser();
        } else {
            askLocationPermission();
        }
    }

    const unenableTrackUser = () => {
        unTrackUser()
    }

    return (
        <View>
            <Text>Vendors page</Text>
            <Button
            title="enable tracking"
            onPress={() => enableTrackUser()}
            />
            <Button
            title="unenable tracking"
            onPress={() => unenableTrackUser()}
            />
        </View>
    )
}