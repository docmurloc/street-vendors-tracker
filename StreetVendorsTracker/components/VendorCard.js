import React from 'react';

import { StyleSheet } from 'react-native';

import { Card } from 'react-native-paper';

const defaultImage = { uri: 'https://firebasestorage.googleapis.com/v0/b/street-vendors-tracker.appspot.com/o/imagePlaceholder.png?alt=media&token=23dc53d7-b447-4c78-96d8-cb1b6634703b' }


export default function VendorCard({ data, onPress }) {
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
                subtitle={data.address}
                subtitleNumberOfLines={2}
            />
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
        backgroundColor: "rgba(214,243,172,1)",
        shadowColor: "rgba(190,202,173,1)",
        shadowOffset: {
            height: 3,
            width: 0
        },
        elevation: 9,
        shadowOpacity: 1,
        shadowRadius: 3,
        borderRadius: 30,
        padding: 10,
        marginTop: 5,
        width: '100%'
    }
});