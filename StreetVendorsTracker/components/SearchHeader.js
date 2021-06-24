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
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {position || searchPosition ?
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
                                        setSelectedPosition(region);
                                    }}
                                >
                                    <Marker
                                        ref={ref}
                                        coordinate={positionMarker}
                                        title={'test'}
                                        description={'desciption'}
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
                            <Text style={styles.textStyle}>close</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                updateSearchPosition(position?.coords, 5000, true);
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <Text style={styles.textStyle}>Use user position</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                updateSearchPosition(selectedPosition, 5000, false);
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <Text style={styles.textStyle}>Select this position</Text>
                        </Pressable>
                    </View>
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
        marginTop: 22
    },
    container: {
        width: '100%'
    },
    buttonAddress: {
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
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