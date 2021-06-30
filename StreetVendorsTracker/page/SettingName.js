import React, { useState, useEffect } from 'react';

import { View, Text, TextInput, StyleSheet } from 'react-native';

import { useStand } from '../contexts/Stand';


export default function SettingName() {

    const {
        standData,
        updateStandName,
    } = useStand();

    const [name, setname] = useState(standData?.name ? standData?.name : '' );

    useEffect(() => {
        updateStandName(name);

    }, [name])


    return (
        <View
            style={styles.container}
        >
            <Text style={styles.text} >Titre</Text>
            <TextInput
                onChangeText={setname}
                style={styles.input}
                value={name}
                placeholder="Titre..."
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: "rgba(247,246,238,1)"
    },
    input: {
        backgroundColor: "rgba(214,243,172,1)",
        shadowColor: "rgba(190,202,173,1)",
        shadowOffset: {
            height: 2,
            width: 0
        },
        elevation: 9,
        margin: 10,
        color: 'black',
        shadowOpacity: 1,
    },
    text : {
        fontSize: 20
    }
});
