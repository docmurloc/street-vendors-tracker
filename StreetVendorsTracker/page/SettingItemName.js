import React, {useState, useEffect} from 'react';

import { View, Text, TextInput } from 'react-native';

import { useItem } from '../contexts/Item'



export default function SettingItemName() {

    const {
        name,
        setName,
    } = useItem();

    const [buffer, setBuffer] = useState(name);

    useEffect(() => {
        setName(buffer);

    }, [buffer])


    return (
        <View>
            <Text>Setting name page</Text>
            <TextInput
                onChangeText={setBuffer}
                value={buffer}
                placeholder="Name..."
            />
        </View>
    )
}