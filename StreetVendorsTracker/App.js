/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StatusBar,
  useColorScheme,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './contexts/Auth';
import { PositionProvider } from './contexts/Position';
import { StandProvider } from './contexts/Stand'


import MainNavigation from './navigation/Main';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <PositionProvider>
      <AuthProvider>
        <StandProvider>
          <NavigationContainer>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <MainNavigation />
          </NavigationContainer>
        </StandProvider>
      </AuthProvider>
    </PositionProvider>
  );
};

export default App;
