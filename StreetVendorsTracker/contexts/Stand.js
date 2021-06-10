import React, { useState, useEffect, useContext, createContext } from 'react';

import firestore from '@react-native-firebase/firestore';

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
    const [isEnabled, setIsEnabled] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescrition] = useState('');
    const [link, setlink] = useState('');
    const [phone, setPhone] = useState('');
    const [positionStand, setPositonStand] = useState(null);
    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState(require('../ressources/images/imagePlaceholder.png'))

    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            const subscriber = firestore()
                .collection('Stands')
                .doc(user.providerData[0].uid)
                .onSnapshot(documentSnapshot => {

                    const dataStand = documentSnapshot.data();

                    console.log('stand data: ', dataStand);

                    if (dataStand) {
                        setName(dataStand?.name);
                        setDescrition(dataStand?.description);
                        setlink(dataStand?.link);
                        setPhone(dataStand?.setPhone);
                        setPositonStand(dataStand?.positionStand);
                    }
                });

            // Stop listening for updates when no longer required
            return () => subscriber();
        }
    }, [user])

    const saveStandInformation = () => {
        console.log("save stand information");
        setLoading(true);

        console.log("user stand ", user.providerData[0].uid);

        firestore()
            .collection('Stands')
            .doc(user.providerData[0].uid)
            .set({
                show : isEnabled,
                uid: user.providerData[0].uid,
                name: name,
                description: description,
                link: link,
                phone: phone,
                positionStand: positionStand,
            })
            .then(() => {
                console.log('User added!');
                setLoading(false);

            });
    }

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);



    return {
        photo,
        setPhoto,
        isEnabled,
        toggleSwitch,
        name,
        setName,
        description,
        setDescrition,
        link,
        setlink,
        phone,
        setPhone,
        positionStand,
        setPositonStand,
        saveStandInformation,
        loading
    };
}