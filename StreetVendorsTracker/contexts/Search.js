import React, { useState, useEffect, useContext, createContext } from 'react';

import Geocoder from 'react-native-geocoding';

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


    const updateSearchPosition = async (coords, radiusSetting , user) => {

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
        updateSearchPosition
    };
}