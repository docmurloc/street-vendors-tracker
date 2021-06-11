import React, { useState, useEffect } from 'react';

import { View, Text, StyleSheet } from 'react-native';

import MultiSlider from '@ptomasroos/react-native-multi-slider';

export default function TimeSlider({title, value, setValue}) {

    const [selected, setSelected] = useState([0, 24]);

    useEffect(() => {
        console.log(`${title} from ${selected[0]} to ${selected[1]}`)
    }, selected)

    return (
        <View
            style={styles.container}
        >
            <Text>{title} from {selected[0]} to {selected[1]}</Text>
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
