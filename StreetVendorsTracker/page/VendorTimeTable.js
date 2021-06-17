import React from 'react';

import { View, Text } from 'react-native';

import TimeSlider from '../components/TimeSliders';

import { useStand } from '../contexts/Stand';


export default function VendorTimeTable() {

    const { updateStandTimeTable } = useStand();

    return (
        <View>
            <TimeSlider
                day={0}
                handleValue={updateStandTimeTable}
            />
            <TimeSlider
                day={1}
                handleValue={updateStandTimeTable}
            />
            <TimeSlider
                day={2}
                handleValue={updateStandTimeTable}
            />
            <TimeSlider
                day={3}
                handleValue={updateStandTimeTable}
            />
            <TimeSlider
                day={4}
                handleValue={updateStandTimeTable}
            />
            <TimeSlider
                day={5}
                handleValue={updateStandTimeTable}
            />
            <TimeSlider
                day={6}
                handleValue={updateStandTimeTable}
            />
        </View>
    )
}