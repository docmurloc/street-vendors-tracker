import React, { useState, useEffect, useRef } from 'react';

import { View, Text, Button, Modal, Pressable, StyleSheet } from 'react-native';

import MapView, { Marker } from "react-native-maps";

import { usePosition } from '../contexts/Position';

import { useSearch } from '../contexts/Search';

export default function SearchHeader() {

    const [modalVisible, setModalVisible] = useState(false);

    const { position, hasLocationPermission, askLocationPermission, trackUser, unTrackUser } = usePosition();

    const { searchPosition, updateSearchPosition } = useSearch();

    const [ selectedPosition, setSelectedPosition] = useState(searchPosition);

    useEffect(() => {
        askLocationPermission();
    }, []);

    useEffect(() => {
        if (hasLocationPermission) {
            trackUser();
        }
        return unTrackUser();
    }, [hasLocationPermission]);

    const ref = useRef(null);

    const positionMarker = {
        ...position?.coords,
        ...searchPosition
    }

    return (
        <View>
            <Text>Search header component</Text>
            <Button
                title="Change position"
                onPress={() => setModalVisible(!modalVisible)}
            />
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
                        <Text style={styles.modalText}>Hello World!</Text>
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
                                updateSearchPosition(position?.coords, 5, true);
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <Text style={styles.textStyle}>Use user position</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                updateSearchPosition(selectedPosition, 5, false);
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
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
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