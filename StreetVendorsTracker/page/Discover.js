import React, { useState, useEffect } from 'react';

import { View, Text, FlatList, StyleSheet } from 'react-native';

import firestore from '@react-native-firebase/firestore';

import VendorCard from '../components/VendorCard';

import SearchHeader from '../components/SearchHeader';


import { useStand } from '../contexts/Stand';

export default function Discover({ navigation }) {

    const [standData, setStandData] = useState(null);

    const { setSelectedStand } = useStand();

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
            <Text style={styles.text} >Nouveaux Marchands</Text>
            {standData ?
                <>
                    <FlatList
                        data={standData}
                        renderItem={({ item }) => {
                            return (

                                <VendorCard data={item} onPress={() => {
                                    console.log("press");
                                    setSelectedStand(item);
                                    navigation.navigate('Information', item);
                                }} />
                            )
                        }}
                        keyExtractor={item => item.id}
                    />
                </>
                :
                <Text>Chargement...</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: "rgba(255,232,225,1)"
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
    text : {
        fontSize : 20,
        padding : 20
    }
});