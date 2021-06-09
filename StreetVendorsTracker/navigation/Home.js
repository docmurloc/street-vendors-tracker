import 'react-native-gesture-handler';
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DiscoverPage from '../page/Discover';
import SearchPage from '../page/Search';
import FavoritesPage from '../page/Favorites';
import SettingsPage from '../page/Settings';

const Tab = createBottomTabNavigator();

export default function Home() {

    return (
            <Tab.Navigator>
                <Tab.Screen name="Discover" component={DiscoverPage} />
                <Tab.Screen name="Search" component={SearchPage} />
                <Tab.Screen name="Favorites" component={FavoritesPage} />
                <Tab.Screen name="Settings" component={SettingsPage} />
            </Tab.Navigator>
    );
}