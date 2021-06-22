import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default function ButtonSetting({ title, value, onPress }) {

    console.log("button setting ", title, value);

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}
        >
            <Text>{title}</Text>
            <View
                style={styles.mainValue}
            >
                <Text>{value ? value : 'not set'}</Text>
            </View>
            <Text> <Icon name="arrow-right" size={30} color="#900" /> </Text>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    mainValue : {
        width : '60%'
    }

});