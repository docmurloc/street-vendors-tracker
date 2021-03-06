/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import Geocoder from 'react-native-geocoding';

import { GOOGLE_API_KEY } from '@env';

import { Provider as PaperProvider } from 'react-native-paper';

Geocoder.init(GOOGLE_API_KEY);

import React from 'react';
import {
  StatusBar,
  useColorScheme,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './contexts/Auth';
import { PositionProvider } from './contexts/Position';
import { StandProvider } from './contexts/Stand';
import { SearchProvider } from './contexts/Search';
import { ItemProvider } from './contexts/Item'



import MainNavigation from './navigation/Main';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <PaperProvider>
      <PositionProvider>
        <AuthProvider>
          <StandProvider>
            <SearchProvider>
              <ItemProvider>
                <NavigationContainer >
                  <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
                  <MainNavigation />
                </NavigationContainer>
              </ItemProvider>
            </SearchProvider>
          </StandProvider>
        </AuthProvider>
      </PositionProvider>
    </PaperProvider>
  );
};

export default App;
