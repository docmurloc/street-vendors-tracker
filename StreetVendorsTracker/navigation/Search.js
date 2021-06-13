import * as React from 'react';

import * as test from 'react-native-reanimated';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import SearchListePage from '../page/SearchListe';
import SearchMapPage from '../page/SearchMap';


const Tab = createMaterialTopTabNavigator();

export default function Search() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Liste" component={SearchListePage} />
      <Tab.Screen name="Map" component={SearchMapPage} />
    </Tab.Navigator>
  );
}