import React, { useState, useEffect, useContext, createContext } from 'react'; 

import { PermissionsAndroid } from "react-native";

import Geolocation from 'react-native-geolocation-service';

const authContext = createContext();

export function PositionProvider({ children }) {
    const position = usePositionData();
    return <authContext.Provider value={position}>{children}</authContext.Provider>;
}

export const usePosition = () => {
    return useContext(authContext);
};

function usePositionData() {
    const [position, setPosition] = useState(null);
    const [hasLocationPermission, setHasLocationPermission] = useState(false);
    const [isTracking, setIsTracking] = useState(null);


    useEffect(() => {
        console.log("position : ", position);
    }, [position]);

    const askLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                title: "Street vendors tracker App position Permission",
                message:
                  "Street vendors tracker needs access to your position " +
                  "so you can find vendor around you.",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
              }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log("You can use the position");
              setHasLocationPermission(true);
              getCurrentPosition();
              return true;
            } else {
              console.log("Position permission denied");
              setHasLocationPermission(false);
              return false;
            }
          } catch (err) {
            console.warn(err);
            return false;
          }
    }

    const getCurrentPosition = async () => {
        if (hasLocationPermission) {
            Geolocation.getCurrentPosition(
                (userPosition) => {
                  console.log(userPosition);
                  setPosition(userPosition);
                },
                (error) => {
                  console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
          }
    }

    const setUserPosition = (data) => {
        setPosition(data);
    }

    const trackUser = () => {
        if (hasLocationPermission && isTracking == null) {
            const id = Geolocation.watchPosition(
                (userPosition) => {
                  console.log("user position update",userPosition);
                  setPosition(userPosition);
                },
                (error) => {
                  console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );

            setIsTracking(id);
        }
    }

    const unTrackUser = () => {
        if (isTracking != null) {
            console.log("untrack user");
            Geolocation.clearWatch(isTracking);
            setIsTracking(null);
        }
    }

    return {
        position,
        hasLocationPermission,
        isTracking,
        askLocationPermission,
        getCurrentPosition,
        setUserPosition,
        trackUser,
        unTrackUser
    };
}