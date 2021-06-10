import React, { useEffect, useRef, useState } from 'react';

import { View, Text, Button } from 'react-native';

import { useStand } from '../contexts/Stand';
import { usePosition } from '../contexts/Position';

import MapView, { Marker } from "react-native-maps";


export default function PositionVendors() {

    const { standData, updateStandCoords } = useStand();

    const { position, hasLocationPermission, askLocationPermission, trackUser, unTrackUser } = usePosition();

    useEffect(() => {
        askLocationPermission();
    }, []);

    useEffect(() => {
        if (hasLocationPermission) {
            trackUser();
        }
        return unTrackUser();
    }, [hasLocationPermission]);


    useEffect(() => {
        console.log("position stand = ", standData?.coords);
    }, [standData]);

    useEffect(() => {
        console.log("position user = ", position);
    }, [position]);

    const [positionSelected, setPositionSelected] = useState(null);

    const ref = useRef(null);

    const positionMarker = {
        ...position?.coords,
        ...standData?.coords
    }

    return (
        <View>
            {position || standData.coords ?
                <>
                    <MapView
                        style={{ height: 500, width: 350 }}
                        initialRegion={{
                            ...positionMarker,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05
                        }}
                        onRegionChangeComplete={(region) => {
                            console.log('region =', region);
                            ref.current?.animateMarkerToCoordinate({
                                ...region,
                                duration: 0
                            });
                            setPositionSelected(region);
                        }}
                    >
                        <Marker
                            ref={ref}
                            coordinate={positionMarker}
                            title={'test'}
                            description={'desciption'}
                        />
                    </MapView>
                    <Button
                        title="validate position"
                        color="#841584"
                        onPress={() => {
                            updateStandCoords(positionSelected);
                        }}
                    />
                </>
                :
                <>
                    <Text>loading...</Text>
                </>
            }

        </View>
    )
}