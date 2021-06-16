import React from 'react';

import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';


import ImagePicker from 'react-native-image-crop-picker';

import { useStand } from '../contexts/Stand';

import ButtonSetting from '../components/ButtonSettings';

const defaultImage = { uri: 'https://firebasestorage.googleapis.com/v0/b/street-vendors-tracker.appspot.com/o/imagePlaceholder.png?alt=media&token=23dc53d7-b447-4c78-96d8-cb1b6634703b' }


export default function Vendors({ navigation }) {


    const {
        standData,
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
                title={"Name :"}
                value={standData?.name}
                onPress={() => navigation.navigate('Setting name')}
            />
            <ButtonSetting
                title={"Descripton :"}
                value={standData?.description}
                onPress={() => navigation.navigate('Setting description')}
            />
            <ButtonSetting
                title={"Phone :"}
                value={standData?.phone}
                onPress={() => navigation.navigate('Setting phone')}
            />
            <ButtonSetting
                title={"Address :"}
                value={standData?.address}
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
