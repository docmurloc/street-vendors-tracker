import 'react-native-gesture-handler';
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import DiscoverPage from '../page/Discover';
import SearchTab from './Search';
import SettingsPage from '../page/Settings';

const Tab = createBottomTabNavigator();

export default function Home() {

    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: 'rgb(247,246,238)',
                inactiveTintColor: 'rgb(46,97,77)',
                activeBackgroundColor: 'rgb(46,97,77)',
                inactiveBackgroundColor: 'rgb(247,246,238)'
            }}
        >
            <Tab.Screen name="Discover" component={DiscoverPage}
                options={{
                    tabBarLabel: 'Découvrir',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="earth" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen name="Search" component={SearchTab} 
                options={{
                    tabBarLabel: 'Chercher',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="magnify" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen name="Settings" component={SettingsPage} 
                options={{
                    tabBarLabel: 'Options',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="cogs" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}