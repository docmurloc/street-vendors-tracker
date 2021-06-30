import React, { useState, useEffect, useRef } from 'react';

import { View, Text, Modal, Pressable, StyleSheet } from 'react-native';

import { Button } from 'react-native-paper';

import MapView, { Marker } from "react-native-maps";

import { usePosition } from '../contexts/Position';

import { useSearch } from '../contexts/Search';

export default function SearchHeader() {

    const [modalVisible, setModalVisible] = useState(false);



    const { position, askLocationPermission, hasLocationPermission } = usePosition();

    const { searchPosition, updateSearchPosition, addressPosition, searchResult } = useSearch();

    const [selectedPosition, setSelectedPosition] = useState(searchPosition);

    useEffect(() => {
        askLocationPermission();
    }, []);

    const ref = useRef(null);

    const positionMarker = {
        ...position?.coords,
        ...searchPosition
    }

    return (
        <View
            style={styles.container}
        >
            <Button
                contentStyle={styles.buttonAddress}
                icon="map-marker"
                mode="contained"
                color="rgba(214,243,172,1)"
                onPress={() => setModalVisible(!modalVisible)}
            >
                <Text
                    numberOfLines={2}
                >
                    {searchResult ? addressPosition : 'Sélectionner une position'}

                </Text>
            </Button>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalView}>
                    {(position || searchPosition) && hasLocationPermission ?
                        <>
                            <MapView
                                style={{ height: "70%", width: 360 }}
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
                                    setSelectedPosition(region);
                                }}
                            >
                                <Marker
                                    ref={ref}
                                    coordinate={positionMarker}
                                    title={'Position Sélectionné'}
                                    description={'La position qui sera utilisée pour chercher les stands'}
                                />
                            </MapView>
                        </>
                        :
                        <>
                            <Text>loading...</Text>
                        </>
                    }
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <Text style={styles.textStyle}>Fermer</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            updateSearchPosition(position?.coords, 5000, true);
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <Text style={styles.textStyle}>Utiliser la position de l'utilisateur</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            updateSearchPosition(selectedPosition, 5000, false);
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <Text style={styles.textStyle}>Utiliser cette position</Text>
                    </Pressable>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    modalView: {
        height: '100%',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: "rgba(247,246,238,1)"

    },
    button: {
        borderRadius: 20,
        padding: 10,
        backgroundColor: "rgba(214,243,172,1)",
        shadowColor: "rgba(190,202,173,1)",
        shadowOffset: {
            height: 2,
            width: 2
        },
        elevation: 9,
        shadowOpacity: 1,
        shadowRadius: 3,
        width: "50%"
    },
    textStyle: {
        color: "rgba(46,97,77,1)",
        fontWeight: "bold",
        textAlign: "center"
    },
});