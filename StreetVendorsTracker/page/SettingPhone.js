import React, {useState, useEffect} from 'react';

import { View, Text, TextInput, StyleSheet } from 'react-native';

import { useStand } from '../contexts/Stand';


export default function SettingPhone() {

    const {
        standData,
        updateStandPhone,
    } = useStand();

    const [phone, setPhone] = useState(standData?.phone ? standData?.phone : '');

    useEffect(() => {
        updateStandPhone(phone);

    }, [phone])


    return (
        <View
            style={styles.container}
        >
            <Text style={styles.text} >Numéro de téléphone</Text>
            <TextInput
                onChangeText={setPhone}
                value={phone}
                style={styles.input}
                placeholder="Numéro..."
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
