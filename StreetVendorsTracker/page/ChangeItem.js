import React from 'react';

import { View, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';

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
            console.log(photo);
            setImage({ uri: photo.path});
        });
    };

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
                    style={styles.imageItem}
                    source={ image ? image : defaultImage }
                />
            </TouchableOpacity>
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
                color="#841584"
                onPress={() => {
                    updateItem(selectedItem, name, description, price, image);
                    resetItem();
                    navigation.goBack();
                } }
            />
            <Button
                title="Delete item"
                color="#841584"
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
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
    imageItem: {
        width: 350,
        height: 200
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
    },
});
