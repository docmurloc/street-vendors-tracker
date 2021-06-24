import React, { useState, useEffect } from 'react';

import firestore from '@react-native-firebase/firestore';

import { View, Text, FlatList, StyleSheet } from 'react-native';

import ItemCard from '../components/ItemCard';

import { useStand } from '../contexts/Stand';
import { useItem } from '../contexts/Item';


export default function InformationMenu({ navigation }) {

    const [items, setItems] = useState([]);


    const {
        selectedStand,
    } = useStand();

    const {
        setSelectedItem
    } = useItem()

    useEffect(() => {
        const subscriber = firestore()
            .collection('Items')
            .where('uid', '==', selectedStand?.uid)
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
                                        setSelectedItem(item);
                                        navigation.navigate('Information item');
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
