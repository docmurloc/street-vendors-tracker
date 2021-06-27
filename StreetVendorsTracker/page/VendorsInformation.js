import React, { useState, useEffect } from 'react';

import { Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Title, Divider, Paragraph, Subheading } from 'react-native-paper';

import firestore from '@react-native-firebase/firestore';

import { useStand } from '../contexts/Stand';


const defaultImage = { uri: 'https://firebasestorage.googleapis.com/v0/b/street-vendors-tracker.appspot.com/o/imagePlaceholder.png?alt=media&token=23dc53d7-b447-4c78-96d8-cb1b6634703b' }


export default function VendorInformation({ navigation }) {

    const { selectedStand } = useStand();

    const [time, setTime] = useState(null);

    const currentDay = new Date().getDay();

    useEffect(() => {
        if (selectedStand?.uid) {
            const subscriber = firestore()
                .collection('TimeTable')
                .doc(selectedStand?.uid)
                .onSnapshot(documentSnapshot => {

                    const dataTimeTable = documentSnapshot.data();

                    setTime(dataTimeTable)
                });

            // Stop listening for updates when no longer required
            return () => subscriber();
        }
    }, [selectedStand?.uid]);

    return (
        <ScrollView
        contentContainerStyle={styles.container}
        >
            <Image
                style={styles.imageStand}
                source={selectedStand?.photo ? selectedStand?.photo : defaultImage}
            />
            <Divider style={styles.divider} />
            <Title>{selectedStand?.name}</Title>
            <Divider style={styles.divider} />
            <Subheading>Time : </Subheading>
            {<Text>Aujourd'hui ouvert de  {time?.[currentDay]?.from} h jusqu'à {time?.[currentDay]?.to} h</Text> }
            <Divider style={styles.divider} />
            <Subheading>Phone : </Subheading>
            <Text>{selectedStand?.phone}</Text>
            <Divider style={styles.divider} />
            <Subheading>Address : </Subheading>
            <Text>{selectedStand?.address}</Text>
            <Divider style={styles.divider} />
            <Subheading>Desciption : </Subheading>
            <Paragraph>{selectedStand?.description}</Paragraph>
            <Divider style={styles.divider} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    imageStand: {
        width: 300,
        height: 150
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
        padding: 5,
        alignItems: 'center',
        backgroundColor: "rgba(255,232,225,1)"

    },
    divider: {
        marginVertical: 5
    }
});
