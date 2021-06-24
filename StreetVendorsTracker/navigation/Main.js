import 'react-native-gesture-handler';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeNavigation from './Home';
import ProfilePage from '../page/Profile';
import PositionVendorsPage from '../page/PositionVendors';
import VendorItemsPage from '../page/VendorItems';
import CreateItemsPage from '../page/CreateItem';
import ChangeItem from '../page/ChangeItem';
import SettingName from '../page/SettingName';
import SettingDescription from '../page/SettingDesciption';
import SettingPhone from '../page/SettingPhone';
import SettingItemDescription from '../page/SettingItemDescription';
import SettingItemPrice from '../page/SettingItemPrice';
import SettingItemName from '../page/SettingItemName';
import InformationItem from '../page/InformationItem';
import LoginPage from '../page/Login';

import Vendor from './Vendor';

import Information from './Information';

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
                        <Stack.Screen name="Vendors" component={Vendor} />
                        <Stack.Screen name="Information" component={Information} />
                        <Stack.Screen name="Position vendors" component={PositionVendorsPage} />
                        <Stack.Screen name="Items vendor" component={VendorItemsPage} />
                        <Stack.Screen name="Create item" component={CreateItemsPage} />
                        <Stack.Screen name="Change item" component={ChangeItem} />
                        <Stack.Screen name="Setting name" component={SettingName} />
                        <Stack.Screen name="Setting description" component={SettingDescription} />
                        <Stack.Screen name="Setting phone" component={SettingPhone} />
                        <Stack.Screen name="Setting item name" component={SettingItemName} />
                        <Stack.Screen name="Setting item description" component={SettingItemDescription} />
                        <Stack.Screen name="Setting item price" component={SettingItemPrice} />
                        <Stack.Screen name="Information item" component={InformationItem} />

                    </>
                ): (
                    <>
                        <Stack.Screen name="Login" component={LoginPage} />
                    </>
                )}
            </Stack.Navigator>
    );
}