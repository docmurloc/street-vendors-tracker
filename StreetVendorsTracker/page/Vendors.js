import React from 'react';

import { View, StyleSheet, ImageBackground } from 'react-native';

import { IconButton } from 'react-native-paper';


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
        width: 315,
        height: 185,
        cropping: true
    }

    const handleChooseImage = () => {
        ImagePicker.openPicker(optionCrop).then(image => {
            updateStandPhoto(image);
        });
    }

    return (
        <View
            style={styles.container}
        >

            <ImageBackground
                style={styles.imageStand}
                source={standData?.photo ? standData?.photo : defaultImage}
            >
                <IconButton
                    icon="camera"
                    color={'rgb(190,202,173)'}
                    size={30}
                    onPress={() => handleChooseImage()}
                />
            </ImageBackground>
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
    imageStand: {
        width: 315,
        height: 185,
        borderRadius: 20
    },
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent : 'space-around',
        backgroundColor: "rgba(247,246,238,1)"
    },
});
