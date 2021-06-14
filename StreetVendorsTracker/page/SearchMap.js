import React, { useState, useEffect, useRef } from 'react';

import MapView, { Marker } from "react-native-maps";

import { useSearch } from '../contexts/Search';

import { View, Text } from 'react-native';

import SearchHeader from '../components/SearchHeader';

export default function SearchMap() {

    const { searchPosition, searchResult, updateSearchPosition } = useSearch();

    return (
        <View>
            <SearchHeader />
            {searchPosition ?
                <MapView
                    style={{ height: 500, width: 350 }}
                    initialRegion={{
                        ...searchPosition,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05
                    }}
                    onRegionChangeComplete={(region) => {
                        console.log('region =', region);
                        updateSearchPosition(region, 5000, false);
                    }}
                >
                    {searchResult?.map((stand) => {
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