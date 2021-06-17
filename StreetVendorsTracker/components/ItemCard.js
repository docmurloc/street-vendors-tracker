import React from 'react';

import { StyleSheet } from 'react-native';

import { Card } from 'react-native-paper';

const defaultImage = { uri: 'https://firebasestorage.googleapis.com/v0/b/street-vendors-tracker.appspot.com/o/imagePlaceholder.png?alt=media&token=23dc53d7-b447-4c78-96d8-cb1b6634703b' }


export default function ItemCard({ data, onPress, children }) {
    return (
        <Card
            onPress={onPress}
            style={styles.card}
        >
            <Card.Cover
                source={data.photo ? data.photo : defaultImage}
                style={styles.imageStand}
            />
            <Card.Title
                title={data.name}
                subtitle={data.price}
                subtitleNumberOfLines={2}
            />
            {children}
        </Card>
    )
}

const styles = StyleSheet.create({
    imageStand: {
        width: 300,
        height: 150,
        borderRadius: 10
    },
    card: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        borderRadius: 30,
        padding: 10,
        marginTop: 5,
        width: '100%'
    },
});