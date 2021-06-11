import React from 'react';

import { View, Text } from 'react-native';

import TimeSlider from '../components/TimeSliders';

export default function VendorTimeTable() {
    return (
        <View>
            <TimeSlider
                title={'Lundi'}
            />
            <TimeSlider
                title={'Mardi'}
            />
            <TimeSlider
                title={'Mercredi'}
            />
            <TimeSlider
                title={'Jeudi'}
            />
            <TimeSlider
                title={'Vendredi'}
            />
            <TimeSlider
                title={'Samedi'}
            />
            <TimeSlider
                title={'Dimanche'}
            />
        </View>
    )
}