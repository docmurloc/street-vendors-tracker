import React from 'react';

import { View, StyleSheet, Button, ImageBackground } from 'react-native';

import { IconButton } from 'react-native-paper';


import ImagePicker from 'react-native-image-crop-picker';

import { useStand } from '../contexts/Stand';
import { useItem } from '../contexts/Item'

import ButtonSetting from '../components/ButtonSettings';


const defaultImage = { uri: 'https://firebasestorage.googleapis.com/v0/b/street-vendors-tracker.appspot.com/o/imagePlaceholder.png?alt=media&token=23dc53d7-b447-4c78-96d8-cb1b6634703b' }


export default function ChangeItem({navigation}) {

    const { updateItem, deleteItem } = useStand();
    const { name, description, price, image, setImage, selectedItem,  resetItem} = useItem();

    const optionCrop = {
        width: 300,
        height: 150,
        cropping: true
    }

    const handleChooseImage = () => {

        ImagePicker.openPicker(optionCrop).then(photo => {
            setImage({ uri: photo.path});
        });
    };

    return (
        <View
            style={styles.container}
        >
            <ImageBackground
                style={styles.imageItem}
                source={image ? image : defaultImage}
            >
                <IconButton
                    icon="camera"
                    color={'rgb(98, 154, 224)'}
                    size={30}
                    onPress={() => handleChooseImage()}
                />
            </ImageBackground>
            <ButtonSetting
                title={"Name :"}
                value={name}
                onPress={() => navigation.navigate('Setting item name')}
            />
            <ButtonSetting
                title={"Descripton :"}
                value={description}
                onPress={() => navigation.navigate('Setting item description')}
            />
            <ButtonSetting
                title={"Price :"}
                value={price}
                onPress={() => navigation.navigate('Setting item price')}
            />
            <Button
                title="update"
                color="rgba(46,97,77,1)"
                onPress={() => {
                    updateItem(selectedItem, name, description, price, image);
                    resetItem();
                    navigation.goBack();
                } }
            />
            <Button
                title="Delete item"
                color="rgba(46,97,77,1)"
                onPress={() => {
                    deleteItem(selectedItem);
                    resetItem();
                    navigation.goBack();
                } }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    imageItem: {
        width: 300,
        height: 150
    },
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: "rgba(247,246,238,1)"
    },
});
