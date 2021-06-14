import React, { useState, useEffect } from 'react';

import firestore from '@react-native-firebase/firestore';

import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export default function Menu({ route }) {

    const [items, setItems] = useState([]);

    const { name, uid } = route.params;

    useEffect(() => {
            const subscriber = firestore()
                .collection('Items')
                .where('uid', '==', uid)
                .onSnapshot(querySnapshot => {

                    let itemsBuffer = []

                    querySnapshot.forEach(function (doc) {
                        itemsBuffer.push({
                            ...doc.data(),
                            id: doc.id
                        });
                    });

                    console.log('stand items array : ', itemsBuffer);
                    setItems(itemsBuffer);
                });

            // Stop listening for updates when no longer required
            return () => subscriber();
    }, []);




    return (
        <View>
            <Text>Menu page</Text>
            <Text>{name}</Text>

            {items ?
                <>
                    <FlatList
                        data={items}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => {
                                        console.log("press");
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
                <Text>loading...</Text>
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
