import React from 'react';

import { View, StyleSheet, Button } from 'react-native';

import { useAuth } from '../contexts/Auth';
import { useStand } from '../contexts/Stand';


export default function Settings({ navigation }) {

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
                color="rgba(98,154,224,1)"
                onPress={() => navigation.navigate('Vendors')}
            />
            {standData?.show ?
                <Button
                    title="Cachez mon stand"
                    color="rgba(98,154,224,1)"
                    onPress={() => updateStandVisibility(false)}
                />
                :
                <Button
                    title="Montrez mon stand"
                    color="rgba(98,154,224,1)"
                    onPress={() => updateStandVisibility(true)}
                />}
            <Button
                title="Déconnexion"
                color="rgba(98,154,224,1)"
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
        backgroundColor: "rgba(255,232,225,1)"
    },
});
