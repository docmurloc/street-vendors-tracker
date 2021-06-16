import React, {useState, useEffect} from 'react';

import { View, Text, TextInput } from 'react-native';

import { useStand } from '../contexts/Stand';


export default function SettingDescription() {

    const {
        standData,
        updateStandDescription,
    } = useStand();

    const [description, setDescription] = useState(standData?.description);

    useEffect(() => {
        updateStandDescription(description);

    }, [description])


    return (
        <View>
            <Text>Setting desciption page</Text>
            <TextInput
                onChangeText={setDescription}
                value={description}
                placeholder="Description..."
            />
        </View>
    )
}