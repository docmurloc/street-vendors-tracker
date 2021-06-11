import React from 'react';

import { View, Text } from 'react-native';

import TimeSlider from '../components/TimeSliders';

import { useStand } from '../contexts/Stand';


export default function VendorTimeTable() {

    const { updateStandTimeTable } = useStand();

    return (
        <View>
            <TimeSlider
                day={'Lundi'}
                handleValue={updateStandTimeTable}
            />
            <TimeSlider
                day={'Mardi'}
                handleValue={updateStandTimeTable}
            />
            <TimeSlider
                day={'Mercredi'}
                handleValue={updateStandTimeTable}
            />
            <TimeSlider
                day={'Jeudi'}
                handleValue={updateStandTimeTable}
            />
            <TimeSlider
                day={'Vendredi'}
                handleValue={updateStandTimeTable}
            />
            <TimeSlider
                day={'Samedi'}
                handleValue={updateStandTimeTable}
            />
            <TimeSlider
                day={'Dimanche'}
                handleValue={updateStandTimeTable}
            />
        </View>
    )
}