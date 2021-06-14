import React from 'react';

import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import { useSearch } from '../contexts/Search';

import SearchHeader from '../components/SearchHeader';

export default function SearchListe({ navigation }) {


    const { searchResult } = useSearch();

    console.log(searchResult);

    return (
        <View>
            <SearchHeader />

            {searchResult ?
                <>
                    <Text>Flatlist</Text>
                    <FlatList
                        data={searchResult}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => {
                                        console.log("press");
                                        navigation.navigate('Information', item);
                                    }}
                                >
                                    <Text>{item.name}</Text>
                                </TouchableOpacity>
                            )
                        }}
                        keyExtractor={item => item.id}
                    />
                </>
                :
                <Text>Select a search position</Text>
            }
        </View>
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
