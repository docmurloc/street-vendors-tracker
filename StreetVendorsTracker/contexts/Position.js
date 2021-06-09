import React, { useState, useEffect, useContext, createContext } from 'react'; 

const authContext = createContext();

export function positionProvider({ children }) {
    const position = usePositionData();
    return <authContext.Provider value={position}>{children}</authContext.Provider>;
}

export const usePosition = () => {
    return useContext(authContext);
};

function usePositionData() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    return {
        user,
        loading,
    };
}