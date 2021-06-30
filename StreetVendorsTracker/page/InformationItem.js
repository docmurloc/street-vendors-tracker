import React from 'react';

import { Text, StyleSheet, ScrollView, Image, View } from 'react-native';
import { Title, Divider, Paragraph, Subheading } from 'react-native-paper';


import { useItem } from '../contexts/Item'



const defaultImage = { uri: 'https://firebasestorage.googleapis.com/v0/b/street-vendors-tracker.appspot.com/o/imagePlaceholder.png?alt=media&token=23dc53d7-b447-4c78-96d8-cb1b6634703b' }


export default function InformationItem() {

    const { name, description, price, image } = useItem();


    return (
        <ScrollView
            contentContainerStyle={styles.container}
        >
            <View
                style={styles.information}
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
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    imageStand: {
        width: 300,
        height: 150
    },
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: "rgba(247,246,238,1)",
        alignItems: 'center',
        paddingTop: 15
    },
    information: {
        backgroundColor: 'rgb(214,243,172)',
        padding: 15,
        borderRadius: 15,
        height: '100%'
    },
    divider: {
        marginVertical: 5
    }
});
