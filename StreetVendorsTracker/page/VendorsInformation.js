import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function VendorInformation({ route, navigation }) {

    const { name } = route.params;

    return (
        <View>
            <Text>Vendor Information page</Text>
            <Text>{name}</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    console.log("press");
                    navigation.navigate('Menu', route.params);
                }}
            >
                <Text>Menu</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
    imageStand: {
        width: 350,
        height: 200
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
    },
});
