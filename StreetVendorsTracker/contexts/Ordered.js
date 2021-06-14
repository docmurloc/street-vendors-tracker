import React, { useState, useEffect, useContext, createContext } from 'react';

import firestore from '@react-native-firebase/firestore';

const geolib = require('geolib');

const authContext = createContext();

export function OrderedProvider({ children }) {
    const dataOrdered = useOrderedInfo();
    return <authContext.Provider value={dataOrdered}>{children}</authContext.Provider>;
}

export const useOrdered = () => {
    return useContext(authContext);
};

function useOrderedInfo() {
    const [currentOrder, setCurrentOrder] = useState(null);
    const [pastOrder, setPastOrder] = useState(null);

    const [basket, setBasket] = useState([]);



    const addItemToBasket = (itemId, nbItem, vendorId) => {
        console.log("addItemToBasket ", itemId, nbItem, vendorId);

        const basketItem = {
            itemId,
            nbItem,
            vendorId
        }

        const newBasket = [
            ...basket
        ]

        newBasket.push(basketItem);

        setBasket(newBasket);

    }

    return {
        currentOrder,
        pastOrder,
        basket,
        addItemToBasket
    };
}
