import 'react-native-gesture-handler';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeNavigation from './Home';
import ProfilePage from '../page/Profile';
import VendorsPage from '../page/Vendors';
import PositionVendorsPage from '../page/PositionVendors';
import VendorItemsPage from '../page/VendorItems';
import CreateItemsPage from '../page/CreateItem';
import VendorTimeTablePage from '../page/VendorTimeTable';
import VendorInformation from '../page/VendorsInformation';
import Menu from '../page/Menu';
import SettingName from '../page/SettingName';
import SettingDescription from '../page/SettingDesciption';
import SettingPhone from '../page/SettingPhone';
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
                        <Stack.Screen name="Position vendors" component={PositionVendorsPage} />
                        <Stack.Screen name="Items vendor" component={VendorItemsPage} />
                        <Stack.Screen name="Create item" component={CreateItemsPage} />
                        <Stack.Screen name="Timetable" component={VendorTimeTablePage} />
                        <Stack.Screen name="Information" component={VendorInformation} />
                        <Stack.Screen name="Setting name" component={SettingName} />
                        <Stack.Screen name="Menu" component={Menu} />
                        <Stack.Screen name="Setting description" component={SettingDescription} />
                        <Stack.Screen name="Setting phone" component={SettingPhone} />
                    </>
                ): (
                    <>
                        <Stack.Screen name="Login" component={LoginPage} />
                    </>
                )}
            </Stack.Navigator>
    );
}