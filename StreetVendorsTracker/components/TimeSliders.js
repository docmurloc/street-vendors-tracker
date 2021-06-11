import React, { useState, useEffect } from 'react';

import { View, Text, StyleSheet } from 'react-native';

import MultiSlider from '@ptomasroos/react-native-multi-slider';

import { useAuth } from '../contexts/Auth';

import firestore from '@react-native-firebase/firestore';

export default function TimeSlider({ day, handleValue }) {

    const [selected, setSelected] = useState([0, 24]);

    const { user } = useAuth();

    useEffect(async () => {
        if (user) {
            const timeTable = await firestore()
                .collection('TimeTable')
                .doc(user.providerData[0].uid)
                .get();

            console.log('timeTable data: ', timeTable.data());

            let data = [0, 23]

            data[0] = timeTable.data()[day]?.from ? timeTable.data()[day].from : 0;
            data[1] = timeTable.data()[day]?.to ? timeTable.data()[day].to : 24;
            setSelected(data)

        }
    }, [user])

    useEffect(() => {
        console.log(`${day} from ${selected[0]} to ${selected[1]}`)
        if (handleValue) {
            handleValue(day, selected);
        }
    }, selected)

    return (
        <View
            style={styles.container}
        >
            <Text>{day} from {selected[0]} to {selected[1]}</Text>
            <MultiSlider

                min={0}
                max={24}
                values={selected}
                onValuesChangeFinish={(values) => { setSelected(values) }}

            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
        alignItems: 'center',
        borderWidth: 1,
    },
});
