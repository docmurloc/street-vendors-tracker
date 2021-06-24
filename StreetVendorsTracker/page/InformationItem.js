import React, { useState, useEffect } from 'react';

import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Title, FAB, Divider, Paragraph, Subheading } from 'react-native-paper';

import firestore from '@react-native-firebase/firestore';

import { useStand } from '../contexts/Stand';
import { useItem } from '../contexts/Item'



const defaultImage = { uri: 'https://firebasestorage.googleapis.com/v0/b/street-vendors-tracker.appspot.com/o/imagePlaceholder.png?alt=media&token=23dc53d7-b447-4c78-96d8-cb1b6634703b' }


export default function InformationItem() {

    const { name, description, price, image} = useItem();


    return (
        <View
            style={styles.container}
        >
            <Image
                style={styles.imageStand}
                source={image ? image : defaultImage}
            />
            <Divider style={styles.divider} />
            <Title>{name}</Title>
            <Divider style={styles.divider} />
            <Subheading>Price : </Subheading>
            <Text>{price}</Text>
            <Divider style={styles.divider} />
            <Subheading>Desciption : </Subheading>
            <Paragraph>{description}</Paragraph>
            <Divider style={styles.divider} />
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
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    container: {
        display: 'flex',
        flex: 1,
        padding: 5
    },
    divider: {
        marginVertical: 5
    }
});
