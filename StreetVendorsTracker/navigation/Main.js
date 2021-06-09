import 'react-native-gesture-handler';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginPage from '../page/Login';

import { useAuth } from '../contexts/Auth';


const Stack = createStackNavigator();

import HomeNavigation from './Home'


export default function Main() {

    const { user } = useAuth();

    return (
            <Stack.Navigator>
                {user ? (
                    <>
                        <Stack.Screen name="Home" component={HomeNavigation} />
                    </>

                ): (
                    <>
                        <Stack.Screen name="Login" component={LoginPage} />
                    </>
                )}
            </Stack.Navigator>
    );
}