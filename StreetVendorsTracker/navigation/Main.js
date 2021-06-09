import 'react-native-gesture-handler';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginPage from '../page/Login';

import { useAuth } from '../contexts/Auth';


const Stack = createStackNavigator();



export default function Main() {

    const { user } = useAuth();

    return (
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginPage} />
            </Stack.Navigator>
    );
}