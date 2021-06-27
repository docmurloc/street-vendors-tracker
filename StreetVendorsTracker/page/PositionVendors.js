import React, { useEffect, useRef, useState } from 'react';

import { View, Text, Button, StyleSheet } from 'react-native';

import { useStand } from '../contexts/Stand';
import { usePosition } from '../contexts/Position';

import MapView, { Marker } from "react-native-maps";


export default function PositionVendors({ navigation }) {

    const { standData, updateStandCoords } = useStand();

    const { position, askLocationPermission, hasLocationPermission } = usePosition();

    useEffect(() => {
        askLocationPermission();
    }, []);

    const [positionSelected, setPositionSelected] = useState(null);

    const ref = useRef(null);

    const positionMarker = {
        ...position?.coords,
        ...standData?.coords
    }

    return (
        <View
            style={styles.container}
        >
            {(position || standData?.coords) && hasLocationPermission ?
                <>
                    <MapView
                        style={{ height: 500, width: 350 }}
                        initialRegion={{
                            ...positionMarker,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05
                        }}
                        onRegionChangeComplete={(region) => {
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
                            title={'Position Sélectionné'}
                            description={'La position qui sera utilisée pour votre stand'}
                        />
                    </MapView>
                    <Button
                        title="Valider la position"
                        color="rgba(98,154,224,1)"
                        onPress={() => {
                            updateStandCoords(positionSelected);
                            navigation.goBack();
                        }}
                    />
                </>
                :
                <>
                    <Text>Chargement...</Text>
                </>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: "rgba(255,232,225,1)"
    },
});
