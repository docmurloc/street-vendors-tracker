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

    const { user } = useAuth();

    const saveStandInformation = () => {
        console.log("save stand information");
        setLoading(true);

        console.log("user stand ", user.providerData[0].uid);

        firestore()
            .collection('Stands')
            .doc(user.providerData[0].uid)
            .set({
                uid: user.providerData[0].uid,
                name: name,
                description: description,
                link: link,
                phone: phone,
            })
            .then(() => {
                console.log('User added!');
                setLoading(false);

            });
    }

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);



    return {
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