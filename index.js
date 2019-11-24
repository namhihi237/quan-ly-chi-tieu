/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import HistoryScreen from './src/screens/HistoryScreen.js';
import ReportScreen from './src/screens/ReportScreen.js';
import AddScreen from './src/screens/AddScreen';
import UpdateScreen from './src/screens/UpdateScreen';
import React from 'react';
import {Image} from 'react-native';
const HistoryStack = createStackNavigator(
  {
    History: {screen: HistoryScreen},
    Add: {screen: AddScreen},
    Edit: {screen: UpdateScreen},
  },
  {
    defaultNavigationOptions: {
      title: 'Quản Lý Chi Tiêu',
      headerTintColor: '#FFF',
      headerStyle: {
        backgroundColor: '#008B8B',
      },
    },
  },
);
// const SettingStack = createStackNavigator({
//   Setting: {screen: SettingScreen},
//   Detail: {screen: DetailScreen},
// });
const TabnavigatorConfigs = {
  animationEnabled: true,
  tabBarOptions: {
    activeBackgroundColor: '#FFE4C4',
    inactiveBackgroundColor: '#fff',
    activeTintColor: '#405BDB',
    inactiveTintColor: '#9B9B9B',
  },
  defaultNavigationOptions: ({navigation}) => ({
    tabBarIcon: ({tintColor}) => {
      const {routeName} = navigation.state;
      if (routeName === 'History') {
        return (
          <Image
            source={require('./src/image/history.png')}
            style={{tintColor: tintColor, width: 26, height: 26}}></Image>
        );
      } else {
        return (
          <Image
            source={require('./src/image/report.png')}
            style={{tintColor: tintColor, width: 26, height: 26}}></Image>
        );
      }
    },
  }),
};
const tab = createBottomTabNavigator(
  {
    History: {screen: HistoryStack},
    Report: {screen: ReportScreen},
  },
  TabnavigatorConfigs,
);
const App = createAppContainer(tab);
AppRegistry.registerComponent(appName, () => App);
