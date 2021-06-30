import 'react-native-gesture-handler';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeNavigation from './Home';
import PositionVendorsPage from '../page/PositionVendors';
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
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'rgb(46,97,77)',
                },
                headerTintColor: 'rgb(247,246,238)',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            {user ? (
                <>
                    <Stack.Screen name="Home" options={{ title: 'Home' }}  component={HomeNavigation} />
                    <Stack.Screen name="Vendors" options={{ title: 'Description du stand' }}  component={Vendor} />
                    <Stack.Screen name="Information" options={{ title: 'Information sur le stand' }} component={Information} />
                    <Stack.Screen name="Position vendors" options={{ title: 'Position du stand' }} component={PositionVendorsPage} />
                    <Stack.Screen name="Create item" options={{ title: 'Objet création' }} component={CreateItemsPage} />
                    <Stack.Screen name="Change item" options={{ title: 'Objet édition' }} component={ChangeItem} />
                    <Stack.Screen name="Setting name" options={{ title: 'Nom du stand' }} component={SettingName} />
                    <Stack.Screen name="Setting description" options={{ title: 'Description du stand' }} component={SettingDescription} />
                    <Stack.Screen name="Setting phone" options={{ title: 'Numéro du stand' }} component={SettingPhone} />
                    <Stack.Screen name="Setting item name" options={{ title: "Nom de l'objet" }} component={SettingItemName} />
                    <Stack.Screen name="Setting item description" options={{ title: "Description de l'objet" }} component={SettingItemDescription} />
                    <Stack.Screen name="Setting item price" options={{ title: "Prix de l'objet" }} component={SettingItemPrice} />
                    <Stack.Screen name="Information item" options={{ title: "Description de l'objet" }} component={InformationItem} />

                </>
            ) : (
                <>
                    <Stack.Screen name="Login" options={{ title: 'Connexion' }}  component={LoginPage} />
                </>
            )}
        </Stack.Navigator>
    );
}