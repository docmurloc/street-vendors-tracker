import React, {useState, useEffect} from 'react';

import { View, Text, TextInput } from 'react-native';

import { useItem } from '../contexts/Item'



export default function SettingItemPrice() {

    const {
        price,
        setPrice,
    } = useItem();

    const [buffer, setBuffer] = useState(price);

    useEffect(() => {
        setPrice(buffer);

    }, [buffer])


    return (
        <View>
            <Text>Setting name page</Text>
            <TextInput
                onChangeText={setBuffer}
                value={buffer}
                placeholder="Price..."
            />
        </View>
    )
}