import React, { useState, useEffect, useContext, createContext } from 'react';

import firestore from '@react-native-firebase/firestore';

import Geocoder from 'react-native-geocoding';
const geolib = require('geolib');

const authContext = createContext();

export function SearchProvider({ children }) {
    const dataSearch = useSearchInfo();
    return <authContext.Provider value={dataSearch}>{children}</authContext.Provider>;
}

export const useSearch = () => {
    return useContext(authContext);
};

function useSearchInfo() {
    const [searchPosition, setSearchPosition] = useState(null);
    const [addressPosition, setAddressPosition] = useState(null);
    const [useUserPosition, setUseUserPosition] = useState(false);
    const [radius, setRadius] = useState(false);
    const [searchResult, setSearchResult] = useState(null);

    useEffect(() => {
        if (searchPosition && radius) {
            const subscriber = firestore()
                .collection('Stands')
                .onSnapshot(querySnapshot => {

                    let itemsBuffer = []

                    querySnapshot.forEach(function (doc) {

                        const data = doc.data();

                        if (calculateDistance(searchPosition, data.coords) <= radius) {
                            itemsBuffer.push({
                                ...doc.data(),
                                id: doc.id
                            });
                        }

                    });

                    console.log('stand info array : ', itemsBuffer);
                    setSearchResult(itemsBuffer);
                });

            // Stop listening for updates when no longer required
            return () => subscriber();
        }
    }, [searchPosition, radius]);


    const updateSearchPosition = async (coords, radiusSetting, user) => {

        console.log("update search position ", coords, radiusSetting, user);

        const json = await Geocoder.from(coords);
        var addressComponent = json.results[0].formatted_address;
        console.log('adress search root : ', addressComponent);

        setRadius(radiusSetting);
        setSearchPosition(coords);
        setAddressPosition(addressComponent);
        setUseUserPosition(user);
    }


    return {
        searchPosition,
        addressPosition,
        useUserPosition,
        radius,
        updateSearchPosition,
        searchResult
    };
}

// this function uses geolib to calculate the distance between the points
function calculateDistance(originCoords, markerCoords) {
    return geolib.getDistance(
        originCoords,
        markerCoords
    );
}