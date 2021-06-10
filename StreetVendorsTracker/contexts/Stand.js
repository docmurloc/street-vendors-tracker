import React, { useState, useEffect, useContext, createContext } from 'react';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

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
    }, [user])


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

    const updateStandCoords = (coords) => {
        firestore()
            .collection('Stands')
            .doc(user.providerData[0].uid)
            .update({
                uid: user.providerData[0].uid,
                coords
            })
            .then(() => {
                console.log('Stand coords updated!');

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

    return {
        standData,
        updateStandName,
        updateStandDescription,
        updateStandLink,
        updateStandPhone,
        updateStandCoords,
        updateStandPhoto
    };
}