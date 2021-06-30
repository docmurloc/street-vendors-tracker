import React, { useState, useEffect } from 'react';

import { View, Text, StyleSheet } from 'react-native';

import MultiSlider from '@ptomasroos/react-native-multi-slider';

import { useAuth } from '../contexts/Auth';

import firestore from '@react-native-firebase/firestore';

const days = {
    6: 'Dimanche',
    0: 'Lundi',
    1: 'Mardi',
    2: 'Mercredi',
    3: 'Jeudi',
    4: 'Vendredi',
    5: 'Samedi',
}

export default function TimeSlider({ day, handleValue }) {

    const [selected, setSelected] = useState([0, 24]);

    const { user } = useAuth();

    useEffect(async () => {
        if (user) {
            const timeTable = await firestore()
                .collection('TimeTable')
                .doc(user.providerData[0].uid)
                .get();

            let data = [0, 23]

            if (timeTable.data()) {
                data[0] = timeTable.data()[day]?.from ? timeTable.data()[day].from : 0;
                data[1] = timeTable.data()[day]?.to ? timeTable.data()[day].to : 24;    
            }
            setSelected(data)

        }
    }, [user])

    useEffect(() => {
        if (handleValue) {
            handleValue(day, selected);
        }
    }, selected)

    return (
        <View
            style={styles.container}
        >
            <Text style={styles.text} >{days[day]} from {selected[0]} to {selected[1]}</Text>
            <MultiSlider
                min={0}
                max={24}
                values={selected}
                style={styles.slider}
                onValuesChangeFinish={(values) => { setSelected(values) }}

            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
        alignItems: 'center',
        backgroundColor: "rgba(214,243,172,1)",
        shadowColor: "rgba(190,202,173,1)",
        shadowOffset: {
            height: 2,
            width: 0
        },
        elevation: 9,
        shadowOpacity: 1,
        shadowRadius: 3,
    },
    text : {
        color : 'black'
    },
    slider : {
        width : '50%'
    }
});
