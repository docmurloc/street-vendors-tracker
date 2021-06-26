import * as React from 'react';

import * as test from 'react-native-reanimated';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import VendorsPage from '../page/Vendors';
import VendorTimeTablePage from '../page/VendorTimeTable';
import VendorMenu from '../page/VendorMenu';



const Tab = createMaterialTopTabNavigator();

export default function Vendor() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'rgb(228, 102, 64)',
        inactiveTintColor: 'rgb(146, 213, 230)',
        activeBackgroundColor: 'rgb(146, 213, 230)',
        inactiveBackgroundColor: 'rgb(228, 102, 64)'
      }}
    >
      <Tab.Screen name="Description" component={VendorsPage} />
      <Tab.Screen name="TimeTable" component={VendorTimeTablePage} />
      <Tab.Screen name="Menu" component={VendorMenu} />
    </Tab.Navigator>
  );
}