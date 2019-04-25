import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import Home from '../pages/Bookmarks';
import Place from '../pages/Place';

const headerBackground = require('../../../design/assets/weatherHeader.png');

const stackNavigator = createStackNavigator(
  {
    Main: {
      screen: Home,
      navigationOptions: () => ({
        title: 'React Native Starter',
        header: null
      }),
    },
    Place: {
      screen: Place,
      navigationOptions: () => ({
        header: null
      })
    }
  },
  {
    defaultNavigationOptions: () => ({
      headerStyle: {
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
      },
      headerBackground: (
        <Image
          style={{ flex: 1 }}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
    }),
  },
);

export default createAppContainer(stackNavigator);
