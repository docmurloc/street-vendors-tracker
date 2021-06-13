import React, { useState, useEffect, useRef } from 'react';

import MapView, { Marker } from "react-native-maps";

import { useSearch } from '../contexts/Search';
import { useStand } from '../contexts/Position';

import { View, Text } from 'react-native';

import SearchHeader from '../components/SearchHeader';

export default function SearchMap() {

    const { searchPosition, searchResult } = useSearch();



    return (
        <View>
            <Text>Search map page</Text>
            <SearchHeader />
            {searchPosition ?
                <MapView
                    style={{ height: 500, width: 350 }}
                    initialRegion={{
                        ...searchPosition,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05
                    }}
                >
                    <Marker
                        coordinate={searchPosition}
                        title={'test'}
                        description={'desciption'}
                    />
                    {searchResult.map((stand) => {
                        return (
                            <Marker
                                key={stand.id}
                                coordinate={stand.coords}
                                title={'test'}
                                description={'desciption'}
                            />
                        )
                    })}
                </MapView>
                :
                <Text>Select a search position</Text>
            }
        </View>
    )
}