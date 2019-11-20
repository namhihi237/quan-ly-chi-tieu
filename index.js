/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import HistoryScreen from './src/screens/HistoryScreen.js';
import ReportScreen from './src/screens/ReportScreen.js';

// const HomeStack = createStackNavigator({
//   Home: {screen: HomeScreen},
//   Detail: {screen: DetailScreen},
// });
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
};
const tab = createBottomTabNavigator(
  {
    History: {screen: HistoryScreen},
    Report: {screen: ReportScreen},
  },
  TabnavigatorConfigs,
);
const App = createAppContainer(tab);
AppRegistry.registerComponent(appName, () => App);
