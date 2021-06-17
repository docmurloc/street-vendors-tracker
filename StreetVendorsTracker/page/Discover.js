import React, { useState, useEffect } from 'react';

import { View, Text, FlatList, StyleSheet } from 'react-native';

import firestore from '@react-native-firebase/firestore';

import VendorCard from '../components/VendorCard';

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
        <View
        style={styles.content}
        >
            {standData ?
                <>
                    <FlatList
                        data={standData}
                        renderItem={({ item }) => {
                            return (

                                <VendorCard data={item} onPress={() => {
                                    console.log("press");
                                    navigation.navigate('Information', item);
                                }} />
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
    content: {
        alignItems: 'center',
        display: 'flex',
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