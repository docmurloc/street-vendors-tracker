import * as React from 'react';

import * as test from 'react-native-reanimated';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import VendorsPage from '../page/Vendors';
import VendorTimeTablePage from '../page/VendorTimeTable';
import VendorMenu from '../page/VendorMenu';



const Tab = createMaterialTopTabNavigator();

export default function Vendor() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Description" component={VendorsPage} />
      <Tab.Screen name="TimeTable" component={VendorTimeTablePage} />
      <Tab.Screen name="Menu" component={VendorMenu} />
    </Tab.Navigator>
  );
}