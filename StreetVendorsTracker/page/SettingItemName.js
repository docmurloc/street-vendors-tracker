import React, {useState, useEffect} from 'react';

import { View, Text, TextInput, StyleSheet } from 'react-native';

import { useItem } from '../contexts/Item'



export default function SettingItemName() {

    const {
        name,
        setName,
    } = useItem();

    const [buffer, setBuffer] = useState(name);

    useEffect(() => {
        setName(buffer);

    }, [buffer])


    return (
        <View
            style={styles.container}
        >
            <Text style={styles.text} >Nom de l'objet</Text>
            <TextInput
                onChangeText={setBuffer}
                value={buffer}
                style={styles.input}
                placeholder="Name..."
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
