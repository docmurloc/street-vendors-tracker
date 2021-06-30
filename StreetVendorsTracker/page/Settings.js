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
                color="rgba(46,97,77,1)"
                onPress={() => navigation.navigate('Vendors')}
            />
            {standData?.show ?
                <Button
                    title="Cacher mon stand"
                    color="rgba(46,97,77,1)"
                    onPress={() => updateStandVisibility(false)}
                />
                :
                <Button
                    title="Montrer mon stand"
                    color="rgba(46,97,77,1)"
                    onPress={() => updateStandVisibility(true)}
                />}
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
});
