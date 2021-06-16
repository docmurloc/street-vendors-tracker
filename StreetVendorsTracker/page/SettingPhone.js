import React, {useState, useEffect} from 'react';

import { View, Text, TextInput } from 'react-native';

import { useStand } from '../contexts/Stand';


export default function SettingPhone() {

    const {
        standData,
        updateStandPhone,
    } = useStand();

    const [phone, setPhone] = useState(standData?.phone);

    useEffect(() => {
        updateStandPhone(phone);

    }, [phone])


    return (
        <View>
            <Text>Setting Phone page</Text>
            <TextInput
                onChangeText={setPhone}
                value={phone}
                placeholder="Phone..."
            />
        </View>
    )
}