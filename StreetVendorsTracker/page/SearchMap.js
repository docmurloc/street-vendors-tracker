import React from 'react';

import MapView, { Marker } from "react-native-maps";

import { useSearch } from '../contexts/Search';

import { View, Text, StyleSheet} from 'react-native';

import SearchHeader from '../components/SearchHeader';

export default function SearchMap() {

    const { searchPosition, searchResult, updateSearchPosition } = useSearch();

    return (
        <View
            style={styles.container}
        >
            <SearchHeader />
            {searchPosition ?
                <MapView
                    style={{ height: '90%', width: 350 }}
                    initialRegion={{
                        ...searchPosition,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05
                    }}
                    onRegionChangeComplete={(region) => {
                        updateSearchPosition(region, 5000, false);
                    }}
                >
                    {searchResult?.map((stand) => {
                        return (
                            <Marker
                                key={stand.id}
                                coordinate={stand.coords}
                                title={stand.name}
                                description={stand.description}
                            />
                        )
                    })}
                </MapView>
                :
                <>
                </>
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
        backgroundColor: "rgba(247,246,238,1)"
    },
});