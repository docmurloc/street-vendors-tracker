import 'react-native-gesture-handler';
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



import DiscoverPage from '../page/Discover';
import SearchTab from './Search';
import SettingsPage from '../page/Settings';

const Tab = createBottomTabNavigator();

export default function Home() {

    return (
            <Tab.Navigator>
                <Tab.Screen name="Discover" component={DiscoverPage} />
                <Tab.Screen name="Search" component={SearchTab} />
                <Tab.Screen name="Settings" component={SettingsPage} />
            </Tab.Navigator>
    );
}