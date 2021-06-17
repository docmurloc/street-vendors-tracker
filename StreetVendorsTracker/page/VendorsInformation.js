import React, { useState, useEffect } from 'react';

import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Title, FAB, Divider, Paragraph, Subheading } from 'react-native-paper';

import firestore from '@react-native-firebase/firestore';


const defaultImage = { uri: 'https://firebasestorage.googleapis.com/v0/b/street-vendors-tracker.appspot.com/o/imagePlaceholder.png?alt=media&token=23dc53d7-b447-4c78-96d8-cb1b6634703b' }


export default function VendorInformation({ route, navigation }) {

    const { name, address, description, phone, photo, uid } = route.params;

    const [time, setTime] = useState({});

    const currentDay = new Date().getDay();

    useEffect(() => {
            const subscriber = firestore()
                .collection('TimeTable')
                .doc(uid)
                .onSnapshot(documentSnapshot => {

                    const dataTimeTable = documentSnapshot.data();

                    console.log('stand data timzeTable: ', dataTimeTable);

                    setTime(dataTimeTable)
                });

            // Stop listening for updates when no longer required
            return () => subscriber();
    }, []);
    
    console.log("time ", time[currentDay]);

    return (
        <View
            style={styles.container}
        >
            <Image
                style={styles.imageStand}
                source={photo ? photo : defaultImage}
            />
            <Divider style={styles.divider} />
            <Title>{name}</Title>
            <Divider style={styles.divider} />
            <Subheading>Time : </Subheading>
            <Text>Aujourd'hui ouvert de  {time[currentDay].from} h jusqu'à {time[currentDay].to} h</Text>
            <Divider style={styles.divider} />
            <Subheading>Phone : </Subheading>
            <Text>{phone}</Text>
            <Divider style={styles.divider} />
            <Subheading>Address : </Subheading>
            <Text>{address}</Text>
            <Divider style={styles.divider} />
            <Subheading>Desciption : </Subheading>
            <Paragraph>{description}</Paragraph>
            <Divider style={styles.divider} />
            <FAB
                style={styles.fab}
                small
                icon="menu"
                label="Menu"
                accessibilityLabel="Menu"
                onPress={() => {
                    console.log("press");
                    navigation.navigate('Menu', route.params);
                }}
            />
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
