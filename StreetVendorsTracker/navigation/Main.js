import 'react-native-gesture-handler';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeNavigation from './Home';
import ProfilePage from '../page/Profile';
import VendorsPage from '../page/Vendors';
import LoginPage from '../page/Login';

import { useAuth } from '../contexts/Auth';



const Stack = createStackNavigator();



export default function Main() {

    const { user } = useAuth();

    return (
            <Stack.Navigator>
                {user ? (
                    <>
                        <Stack.Screen name="Home" component={HomeNavigation} />
                        <Stack.Screen name="Profile" component={ProfilePage} />
                        <Stack.Screen name="Vendors" component={VendorsPage} />
                    </>
                ): (
                    <>
                        <Stack.Screen name="Login" component={LoginPage} />
                    </>
                )}
            </Stack.Navigator>
    );
}