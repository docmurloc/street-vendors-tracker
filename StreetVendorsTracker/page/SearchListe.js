import React from 'react';

import { View, Text, FlatList, StyleSheet } from 'react-native';

import { useSearch } from '../contexts/Search';

import SearchHeader from '../components/SearchHeader';
import VendorCard from '../components/VendorCard';


export default function SearchListe({ navigation }) {


    const { searchResult } = useSearch();

    console.log(searchResult);

    return (
        <View
            style={styles.container}
        >
            <SearchHeader />

            {searchResult ?
                <>
                    <FlatList
                        data={searchResult}
                        renderItem={({ item }) => {
                            return (

                                <VendorCard data={item} onPress={() => {
                                    console.log("press");
                                    navigation.navigate('Information', item);
                                }} />
                            )
                        }}
                        keyExtractor={item => item.id}
                    />
                </>
                :
                <Text>Sélectionnez une position pour chercher un stand</Text>
            }
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
