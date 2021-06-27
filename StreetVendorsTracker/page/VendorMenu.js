import React, { useState, useEffect } from 'react';

import firestore from '@react-native-firebase/firestore';

import { View, Text, FlatList, StyleSheet } from 'react-native';

import { FAB } from 'react-native-paper';

import ItemCard from '../components/ItemCard';

import { useStand } from '../contexts/Stand';
import { useItem } from '../contexts/Item';


export default function VendorMenu({ navigation }) {

    const [items, setItems] = useState([]);


    const {
        standData,
    } = useStand();

    const {
        setSelectedItem
    } = useItem()

    useEffect(() => {
        if (standData) {
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
        }
    }, [standData]);




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
                                        setSelectedItem(item);
                                        navigation.navigate('Change item');
                                    }} />
                                </>
                            )
                        }}
                        keyExtractor={item => item.id}
                    />
                </>
                :
                <Text>Chargement...</Text>
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
        backgroundColor: 'rgba(255,232,225,1)',
        display: 'flex',
        alignItems: 'center',
        flex: 1
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(136,184,50,1)",
    },
});
