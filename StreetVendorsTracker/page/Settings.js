import React, { useState } from 'react';

import { View, StyleSheet, Button, Modal, Text, Pressable } from 'react-native';

import { useAuth } from '../contexts/Auth';
import { useStand } from '../contexts/Stand';


export default function Settings({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false);


    const { SignOut } = useAuth();

    const {
        standData,
        updateStandVisibility
    } = useStand();

    return (
        <View
            style={styles.container}
        >
            <Button
                title="Mon stand"
                color="rgba(46,97,77,1)"
                onPress={() => navigation.navigate('Vendors')}
            />
            {standData?.show ?
                <Button
                    title="Cacher mon stand"
                    color="rgba(46,97,77,1)"
                    onPress={() => {
                        updateStandVisibility(false);
                    }}
                />
                :
                <Button
                    title="Montrer mon stand"
                    color="rgba(46,97,77,1)"
                    onPress={() => {
                        if ( !standData?.address || !standData?.description || !standData?.name || !standData?.phone || !standData?.photo) {
                            setModalVisible(true);
                        } else {
                            updateStandVisibility(true)
                        }
                    }}
                />}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalView}>
                    <Text style={styles.textStyle} >Vous n'avez pas remplie toutes les informations sur votre stand dans 'Mon Stand'</Text>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <Text style={styles.textStyle}>Fermer la pop-up</Text>
                    </Pressable>
                </View>
            </Modal>
            <Button
                title="Déconnexion"
                color='rgb(190,202,173)'
                onPress={() => SignOut()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: "rgba(247,246,238,1)"
    },
    modalView: {
        height: '100%',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: "rgba(247,246,238,1)"

    },
    button: {
        borderRadius: 20,
        padding: 10,
        backgroundColor: "rgba(214,243,172,1)",
        shadowColor: "rgba(190,202,173,1)",
        shadowOffset: {
            height: 2,
            width: 2
        },
        elevation: 9,
        shadowOpacity: 1,
        shadowRadius: 3,
        width: "50%"
    },
    textStyle: {
        color: "rgba(46,97,77,1)",
        fontWeight: "bold",
        textAlign: "center"
    },
    text: {
        fontSize: 30,
        padding: 30,
        textAlign: 'center',
        backgroundColor: "rgba(214,243,172,1)",
        shadowColor: "rgba(190,202,173,1)",
        shadowOffset: {
            height: 3,
            width: 0
        },
        elevation: 9,
        shadowOpacity: 1,
        shadowRadius: 3,
        color: 'black',
        borderRadius: 25
    }
});
