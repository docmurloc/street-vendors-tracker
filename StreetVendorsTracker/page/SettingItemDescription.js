import React, {useState, useEffect} from 'react';

import { View, Text, TextInput, StyleSheet } from 'react-native';

import { useItem } from '../contexts/Item'

export default function SettingItemDescription() {

    const {
        description,
        setDescription,
    } = useItem();

    const [buffer, setBuffer] = useState(description);

    useEffect(() => {
        setDescription(buffer);

    }, [buffer])


    return (
        <View
            style={styles.container}
        >
            <Text style={styles.text} >Description de l'objet</Text>
            <TextInput
                onChangeText={setBuffer}
                value={buffer}
                style={styles.input}
                placeholder="Description..."
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
