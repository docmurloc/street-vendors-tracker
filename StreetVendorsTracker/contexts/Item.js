import React, { useState, useContext, createContext } from 'react';

const authContext = createContext();

export function ItemProvider({ children }) {
    const item = useItemInformation();
    return <authContext.Provider value={item}>{children}</authContext.Provider>;
}

export const useItem = () => {
    return useContext(authContext);
};

function useItemInformation() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);

    const resetItem = () => {
        setImage('');
        setDescription('');
        setPrice('');
        setImage(null);
    }


    return {
        name,
        setName,
        description,
        setDescription,
        price,
        setPrice,
        image,
        setImage,
        resetItem
    };
}