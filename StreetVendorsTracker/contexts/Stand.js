import React, { useState, useEffect, useContext, createContext } from 'react';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import Geocoder from 'react-native-geocoding';

import { GOOGLE_API_KEY } from '@env'

console.log("env key ", GOOGLE_API_KEY);

Geocoder.init(GOOGLE_API_KEY);

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

    const [standData, setStandData] = useState(null)
    const [items, setItems] = useState([])

    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            const subscriber = firestore()
                .collection('Stands')
                .doc(user.providerData[0].uid)
                .onSnapshot(documentSnapshot => {

                    const dataStand = documentSnapshot.data();

                    console.log('stand data: ', dataStand);

                    setStandData(dataStand)
                });

            // Stop listening for updates when no longer required
            return () => subscriber();
        }
    }, [user]);


    useEffect(() => {
        if (user) {
            const subscriber = firestore()
                .collection('Items')
                .where('uid', '==', user.providerData[0].uid)
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
    }, [user]);




    const updateStandName = (name) => {
        firestore()
            .collection('Stands')
            .doc(user.providerData[0].uid)
            .update({
                uid: user.providerData[0].uid,
                name
            })
            .then(() => {
                console.log('Stand name updated!');

            });
    }

    const updateStandLink = (link) => {
        firestore()
            .collection('Stands')
            .doc(user.providerData[0].uid)
            .update({
                uid: user.providerData[0].uid,
                link
            })
            .then(() => {
                console.log('Stand link updated!');

            });
    }

    const updateStandDescription = (description) => {
        firestore()
            .collection('Stands')
            .doc(user.providerData[0].uid)
            .update({
                uid: user.providerData[0].uid,
                description
            })
            .then(() => {
                console.log('Stand description updated!');

            });
    }

    const updateStandPhone = (phone) => {
        firestore()
            .collection('Stands')
            .doc(user.providerData[0].uid)
            .update({
                uid: user.providerData[0].uid,
                phone
            })
            .then(() => {
                console.log('Stand phone updated!');

            });
    }

    const updateStandCoords = async (coords) => {

        const json = await Geocoder.from(coords);
        var addressComponent = json.results[0].formatted_address;
        console.log('adress stand : ', addressComponent);

        firestore()
            .collection('Stands')
            .doc(user.providerData[0].uid)
            .update({
                uid: user.providerData[0].uid,
                address : addressComponent,
                coords
            })
            .then(() => {
                console.log('Stand coords updated!');

            });
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
            .then(() => {
                console.log('Stand timetable updated!');

            });
    }

    const updateStandPhoto = async (photoData) => {

        console.log("photo data = ", photoData);

        const reference = storage().ref(`Stands/${user.providerData[0].uid}/StandImage.jpg`);

        await reference.putFile(photoData.uri);


        const url = await reference.getDownloadURL();

        console.log("image uploaded url = ", url);

        firestore()
            .collection('Stands')
            .doc(user.providerData[0].uid)
            .update({
                photo: {
                    uri: url
                },
            })
            .then(() => {
                console.log('Image user stand upload');
            });
    }

    const createItem = async (name, desciption, price, photoData) => {
        console.log("photo data = ", photoData);

        const reference = storage().ref(`Items/${user.providerData[0].uid}/${photoData.fileName}`);

        await reference.putFile(photoData.uri);


        const url = await reference.getDownloadURL();

        console.log("image uploaded url = ", url);

        firestore()
            .collection('Items')
            .add({
                name,
                desciption,
                price,
                photo: {
                    uri: url
                },
                uid: user.providerData[0].uid
            })
            .then(() => {
                console.log('Image user stand upload');
            });
    }

    return {
        standData,
        items,
        updateStandName,
        updateStandDescription,
        updateStandLink,
        updateStandPhone,
        updateStandCoords,
        updateStandPhoto,
        createItem,
        updateStandTimeTable
    };
}