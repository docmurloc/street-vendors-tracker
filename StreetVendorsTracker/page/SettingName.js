import React, { useState, useEffect } from 'react';

import { View, Text, TextInput, StyleSheet } from 'react-native';

import { useStand } from '../contexts/Stand';


export default function SettingName() {

    const {
        standData,
        updateStandName,
    } = useStand();

    const [name, setname] = useState(standData?.name);

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
        backgroundColor: "rgba(255,232,225,1)"
    },
    input: {
        backgroundColor: "rgba(146,213,230,1)",
        shadowColor: "rgba(98,154,224,1)",
        shadowOffset: {
            height: 2,
            width: 0
        },
        elevation: 9,
        margin: 10,
        color: 'rgba(228, 102, 64,1)',
        shadowOpacity: 1,
    },
    text : {
        color: "rgba(136,184,50,1)",
        fontSize: 20
    }
});
