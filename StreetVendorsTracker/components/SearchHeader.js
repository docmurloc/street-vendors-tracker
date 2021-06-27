import React, { useState, useEffect, useRef } from 'react';

import { View, Text, Modal, Pressable, StyleSheet } from 'react-native';

import { Button } from 'react-native-paper';

import MapView, { Marker } from "react-native-maps";

import { usePosition } from '../contexts/Position';

import { useSearch } from '../contexts/Search';

export default function SearchHeader() {

    const [modalVisible, setModalVisible] = useState(false);



    const { position, askLocationPermission } = usePosition();

    const { searchPosition, updateSearchPosition, addressPosition } = useSearch();

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
                color="rgba(98,154,224,1)"
                onPress={() => setModalVisible(!modalVisible)}
            >
                <Text
                    numberOfLines={2}
                >
                    {addressPosition}

                </Text>
            </Button>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalView}>
                    {position || searchPosition ?
                        <>
                            <MapView
                                style={{ height: "70%", width: 360 }}
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: 'red'
    },
    container: {
        width: '100%'
    },
    modalView: {
        height: '100%',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: "rgba(255,232,225,1)"

    },
    button: {
        borderRadius: 20,
        padding: 10,
        backgroundColor: "rgba(98,154,224,1)",
        shadowColor: "rgba(146,213,230,1)",
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
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});