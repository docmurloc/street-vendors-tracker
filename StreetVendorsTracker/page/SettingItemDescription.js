import React, {useState, useEffect} from 'react';

import { View, Text, TextInput } from 'react-native';

import { useItem } from '../contexts/Item'

export default function SettingItemDescription() {

    const {
        description,
        setDescription,
    } = useItem();

    const [buffer, setBuffer] = useState(description);

    useEffect(() => {
        setDescription(buffer);

    }, [buffer])


    return (
        <View>
            <Text>Setting name page</Text>
            <TextInput
                onChangeText={setBuffer}
                value={buffer}
                placeholder="Description..."
            />
        </View>
    )
}