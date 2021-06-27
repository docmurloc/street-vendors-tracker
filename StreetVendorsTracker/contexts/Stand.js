import React, { useState, useEffect, useContext, createContext } from 'react';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import Geocoder from 'react-native-geocoding';

import { useAuth } from '../contexts/Auth';

const authContext = createContext();

export function StandProvider({ children }) {
    const data = useStandData();
    return <authContext.Provider value={data}>{children}</authContext.Provider>;
}

export const useStand = () => {
    return useContext(authContext);
};

function useStandData() {

    const [standData, setStandData] = useState(null);
    const [items, setItems] = useState([]);

    const [selectedStand, setSelectedStand] = useState(null);

    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            const subscriber = firestore()
                .collection('Stands')
                .doc(user.providerData[0].uid)
                .onSnapshot(documentSnapshot => {

                    const dataStand = documentSnapshot.data();

                    setStandData(dataStand)
                });

            // Stop listening for updates when no longer required
            return () => subscriber();
        }
    }, [user]);


    useEffect(() => {
        if (user && standData) {
            const subscriber = firestore()
                .collection('Items')
                .where('uid', '==', user.providerData[0].uid)
                .onSnapshot(querySnapshot => {

                    let itemsBuffer = []

                    querySnapshot?.forEach(function (doc) {
                        itemsBuffer.push({
                            ...doc.data(),
                            id: doc.id
                        });
                    });

                    setItems(itemsBuffer);
                });

            // Stop listening for updates when no longer required
            return () => subscriber();
        }
    }, [user, standData]);

    const updateStandName = (name) => {
        firestore()
            .collection('Stands')
            .doc(user.providerData[0].uid)
            .set({
                uid: user.providerData[0].uid,
                name
            }, { merge: true })
    }

    const updateStandLink = (link) => {
        firestore()
            .collection('Stands')
            .doc(user.providerData[0].uid)
            .set({
                uid: user.providerData[0].uid,
                link
            }, { merge: true })
    }

    const updateStandDescription = (description) => {
        firestore()
            .collection('Stands')
            .doc(user.providerData[0].uid)
            .set({
                uid: user.providerData[0].uid,
                description
            }, { merge: true })
    }

    const updateStandPhone = (phone) => {
        firestore()
            .collection('Stands')
            .doc(user.providerData[0].uid)
            .set({
                uid: user.providerData[0].uid,
                phone
            }, { merge: true })
    }

    const updateStandCoords = async (coords) => {

        const json = await Geocoder.from(coords);
        var addressComponent = json.results[0].formatted_address;

        firestore()
            .collection('Stands')
            .doc(user.providerData[0].uid)
            .set({
                uid: user.providerData[0].uid,
                address: addressComponent,
                coords
            }, { merge: true })
    }

    const updateStandVisibility = async (visibility) => {

        firestore()
            .collection('Stands')
            .doc(user.providerData[0].uid)
            .set({
                uid: user.providerData[0].uid,
                show : visibility
            }, { merge: true })
    }

    const updateStandTimeTable = (day, value) => {


        const data = {
            uid: user.providerData[0].uid,
        }

        data[day] = {
            from: value[0],
            to: value[1],
        }

        firestore()
            .collection('TimeTable')
            .doc(user.providerData[0].uid)
            .set(data, { merge: true })
    }

    const updateStandPhoto = async (photoData) => {

        const reference = storage().ref(`Stands/${user.providerData[0].uid}/StandImage.jpg`);

        await reference.putFile(photoData.path);


        const url = await reference.getDownloadURL();

        firestore()
            .collection('Stands')
            .doc(user.providerData[0].uid)
            .set({
                uid: user.providerData[0].uid,
                photo: {
                    uri: url
                },
            }, { merge: true })
    }

    const createItem = async (name, description, price, photoData) => {

        const reference = storage().ref(`Items/${user.providerData[0].uid}/${photoData.fileName}`);

        await reference.putFile(photoData.uri);


        const url = await reference.getDownloadURL();

        firestore()
            .collection('Items')
            .add({
                name,
                description,
                price,
                photo: {
                    uri: url
                },
                uid: user.providerData[0].uid
            })
    }

    const updateItem = async (item, name, description, price, photo) => {

        const data = {
            description,
            name,
            photo,
            price,
            uid : item.uid
        }

        if (!photo.uri.includes('http')) {
            const reference = storage().ref(`Items/${user.providerData[0].uid}/${item.id}.jpg`);

            await reference.putFile(photo.uri);
    
    
            data.photo.uri = await reference.getDownloadURL();
    
        }

        firestore()
            .collection('Items')
            .doc(item.id)
            .set(data, { merge: true })
    }

    const deleteItem = async (item) => {

        firestore()
            .collection('Items')
            .doc(item.id)
            .delete()
    }

    return {
        standData,
        items,
        selectedStand,
        updateStandName,
        updateStandDescription,
        updateStandLink,
        updateStandPhone,
        updateStandCoords,
        updateStandPhoto,
        createItem,
        updateStandTimeTable,
        updateItem,
        deleteItem,
        setSelectedStand,
        updateStandVisibility
    };
}