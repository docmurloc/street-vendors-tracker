import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default function ButtonSetting({ title, value, onPress }) {

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}
        >
            <Text style={styles.text} >{title}</Text>
            <View
                style={styles.mainValue}
            >
                <Text style={styles.text} >{value ? value : 'not set'}</Text>
            </View>
            <Text> <Icon name="arrow-right" size={30} color="rgba(136,184,50,1)" /> </Text>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "rgba(146,213,230,1)",
        shadowColor: "rgba(98,154,224,1)",
        shadowOffset: {
            height: 3,
            width: 0
        },
        elevation: 9,
        shadowOpacity: 1,
        shadowRadius: 3,
        width: '100%',
        height: 55
    },
    mainValue: {
        width: '60%'
    },
    text : {
        color : 'rgba(228, 102, 64,1)'
    }

});