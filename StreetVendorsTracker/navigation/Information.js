import * as React from 'react';

import * as test from 'react-native-reanimated';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import VendorInformation from '../page/VendorsInformation';
import InformationMenu from '../page/InformationMenu';



const Tab = createMaterialTopTabNavigator();

export default function Information() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Description" component={VendorInformation} />
      <Tab.Screen name="Menu" component={InformationMenu} />
    </Tab.Navigator>
  );
}