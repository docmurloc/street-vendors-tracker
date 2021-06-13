import React from 'react';

import { View, Text, FlatList } from 'react-native';

import { useSearch } from '../contexts/Search';

import SearchHeader from '../components/SearchHeader';

export default function SearchListe() {


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
                                <Text>{item.name}</Text>
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