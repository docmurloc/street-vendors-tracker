import React, { useState } from 'react';

import { View, Text, Button, Switch, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { launchImageLibrary } from 'react-native-image-picker';

import { useStand } from '../contexts/Stand';

export default function Vendors({ navigation }) {


    const { isEnabled,
        toggleSwitch,
        name,
        setName,
        description,
        setDescrition,
        link,
        setlink,
        phone,
        setPhone,
        photo,
        saveStandInformation,
        uploadPhotoStand
     } = useStand();

    const optionPhoto = {
        mediaType : 'photo',
        maxWidth : 350,
        maxHeight : 200,
        selectionLimit : 1,
        noData: true
    }

    const [photoSelected, setPhotoSelected] = useState(photo)

    const handleChooseImage = () => {
        launchImageLibrary(optionPhoto, (response) => {
            if (response) {
                console.log("info image choosen", response, response.assets[0].uri);
                setPhotoSelected({
                    ...response.assets[0]
                });
            }
        });
    };

    return (
        <View>
            <Text>Vendors page</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    console.log("press");
                    handleChooseImage();
                }}
            >
                <Image
                    style={styles.imageStand}
                    source={photoSelected}
                />
            </TouchableOpacity>
            <Button
                onPress={() => {
                    uploadPhotoStand(photoSelected);
                }}
                title="upload image"
                color="#841584"
                accessibilityLabel="Save stand information"
            />
            <TextInput
                style={styles.input}
                onChangeText={setName}
                value={name}
                placeholder="name..."
            />
            <TextInput
                style={styles.input}
                onChangeText={setDescrition}
                value={description}
                placeholder="desciption..."
            />
            <TextInput
                style={styles.input}
                onChangeText={setlink}
                value={link}
                placeholder="link..."
            />
            <TextInput
                style={styles.input}
                onChangeText={setPhone}
                value={phone}
                placeholder="phone..."
            />
            <Button
                onPress={() => {
                    saveStandInformation();
                }}
                title="save"
                color="#841584"
                accessibilityLabel="Save stand information"
            />
            <Button
                title="position stand"
                color="#841584"
                onPress={() => navigation.navigate('Position vendors')}
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
