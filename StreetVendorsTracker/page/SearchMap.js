import React, { useState, useEffect, useRef } from 'react';

import MapView, { Marker } from "react-native-maps";

import { useSearch } from '../contexts/Search';
import { usePosition } from '../contexts/Position';

import { View, Text } from 'react-native';

import SearchHeader from '../components/SearchHeader';

export default function SearchMap() {

    const { searchPosition } = useSearch();


    const positionMarker = {
        ...searchPosition
    }

    return (
        <View>
            <Text>Search map page</Text>
            <SearchHeader/>
        </View>
    )
}