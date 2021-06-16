import React, {useState, useEffect} from 'react';

import { View, Text, TextInput } from 'react-native';

import { useStand } from '../contexts/Stand';


export default function SettingName() {

    const {
        standData,
        updateStandName,
    } = useStand();

    const [name, setname] = useState(standData?.name);

    useEffect(() => {
        updateStandName(name);

    }, [name])


    return (
        <View>
            <Text>Setting name page</Text>
            <TextInput
                onChangeText={setname}
                value={name}
                placeholder="name..."
            />
        </View>
    )
}