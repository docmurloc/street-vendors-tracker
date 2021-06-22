import React, { useState, useEffect } from 'react';

import firestore from '@react-native-firebase/firestore';

import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import { FAB } from 'react-native-paper';

import ItemCard from '../components/ItemCard';

import { useStand } from '../contexts/Stand';


export default function VendorMenu({ navigation }) {

    const [items, setItems] = useState([]);


    const {
        standData,
    } = useStand();

    useEffect(() => {
        const subscriber = firestore()
            .collection('Items')
            .where('uid', '==', standData?.uid)
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
        <View
            style={styles.container}
        >
            {items ?
                <>
                    <FlatList
                        data={items}
                        renderItem={({ item }) => {
                            return (
                                <>
                                    <ItemCard data={item} onPress={() => {
                                        console.log("press");
                                    }} />
                                </>
                            )
                        }}
                        keyExtractor={item => item.id}
                    />
                </>
                :
                <Text>loading...</Text>
            }
            <FAB
                style={styles.fab}
                small
                icon="plus"
                onPress={() => navigation.navigate('Create item')}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        display: 'flex',
        alignItems: 'center',
        flex: 1
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
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});