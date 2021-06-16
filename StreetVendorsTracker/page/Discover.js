import React, { useState, useEffect } from 'react';

import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import firestore from '@react-native-firebase/firestore';

export default function Discover({ navigation }) {

    const [standData, setStandData] = useState(null);

    useEffect(() => {
        const subscriber = firestore()
            .collection('Stands')
            .onSnapshot(querySnapshot => {

                let itemsBuffer = []

                querySnapshot.forEach(function (doc) {

                    itemsBuffer.push({
                        ...doc.data(),
                        id: doc.id
                    });

                });

                console.log('stand info discover array : ', itemsBuffer);
                setStandData(itemsBuffer);
            });

        // Stop listening for updates when no longer required
        return () => subscriber();
    }, []);

    return (
        <View>
            <Text>Discover page</Text>
            {standData ?
                <>
                    <Text>Flatlist</Text>
                    <FlatList
                        data={standData}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => {
                                        console.log("press");
                                        navigation.navigate('Information', item);
                                    }}
                                >
                                    <Text>{item.name}</Text>
                                </TouchableOpacity>
                            )
                        }}
                        keyExtractor={item => item.id}
                    />
                </>
                :
                <Text>Loading...</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
    imageStand: {
        width: 350,
        height: 200
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
    },
});