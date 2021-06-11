import React , { useState } from 'react';

import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';

import { launchImageLibrary } from 'react-native-image-picker';

import { useStand } from '../contexts/Stand';


const defaultImage = { uri: 'https://firebasestorage.googleapis.com/v0/b/street-vendors-tracker.appspot.com/o/imagePlaceholder.png?alt=media&token=23dc53d7-b447-4c78-96d8-cb1b6634703b' }


export default function CreateItem() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);

    const { createItem } = useStand();

    const optionPhoto = {
        mediaType : 'photo',
        maxWidth : 350,
        maxHeight : 200,
        selectionLimit : 1,
        noData: true
    }

    const handleChooseImage = () => {
        launchImageLibrary(optionPhoto, (response) => {
            if (response) {
                console.log("info image choosen", response, response.assets[0].uri);
                setImage({
                    ...response.assets[0]
                });
            }
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
            <TextInput
                style={styles.input}
                onChangeText={setName}
                value={name}
                placeholder="name..."
            />
            <TextInput
                style={styles.input}
                onChangeText={setDescription}
                value={description}
                placeholder="desciption..."
            />
            <TextInput
                style={styles.input}
                onChangeText={setPrice}
                value={price}
                placeholder="price..."
            />
            <Button
                title="Create item"
                color="#841584"
                onPress={() => {
                    createItem(name, description, price, image);
                    //navigation.navigate('Position vendors')
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
