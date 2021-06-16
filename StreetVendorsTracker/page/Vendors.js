import React from 'react';

import { View, Text, Button, Switch, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { launchImageLibrary } from 'react-native-image-picker';

import ImagePicker from 'react-native-image-crop-picker';

import { useStand } from '../contexts/Stand';

import ButtonSetting from '../components/ButtonSettings';


const defaultImage = { uri: 'https://firebasestorage.googleapis.com/v0/b/street-vendors-tracker.appspot.com/o/imagePlaceholder.png?alt=media&token=23dc53d7-b447-4c78-96d8-cb1b6634703b' }


export default function Vendors({ navigation }) {


    const {
        standData,
        updateStandName,
        updateStandDescription,
        updateStandLink,
        updateStandPhone,
        updateStandPhoto
    } = useStand();

    const optionCrop = {
        width: 350,
        height: 200,
        cropping: true
    }

    const handleChooseImage = () => {
        ImagePicker.openPicker(optionCrop).then(image => {
            console.log(image);
            updateStandPhoto(image);
        });
    }

    return (
        <View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    console.log("press");
                    handleChooseImage();
                }}
            >
                <Image
                    style={styles.imageStand}
                    source={standData.photo ? standData.photo : defaultImage}
                />
            </TouchableOpacity>
            <ButtonSetting
                title={"Name"}
                value={standData?.name }
                onPress={() => console.log('press')}
            />
            <TextInput
                style={styles.input}
                onChangeText={updateStandName}
                value={standData?.name}
                placeholder="name..."
            />
            <TextInput
                style={styles.input}
                onChangeText={updateStandDescription}
                value={standData?.description}
                placeholder="desciption..."
            />
            <TextInput
                style={styles.input}
                onChangeText={updateStandLink}
                value={standData?.link}
                placeholder="link..."
            />
            <TextInput
                style={styles.input}
                onChangeText={updateStandPhone}
                value={standData?.phone}
                placeholder="phone..."
            />
            <Button
                title="position stand"
                color="#841584"
                onPress={() => navigation.navigate('Position vendors')}
            />
            <Button
                title="Timetable"
                color="#841584"
                onPress={() => navigation.navigate('Timetable')}
            />
            <Button
                title="Menu"
                color="#841584"
                onPress={() => navigation.navigate('Items vendor')}
            />
        </View >
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
