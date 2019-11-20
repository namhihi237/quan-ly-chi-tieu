import React, {Component} from 'react';
import {Button, Text, View, Image} from 'react-native';
export default class HistoryScreen extends Component {
  static navigationOptions = {
    swipeEnabled: true,
    tabBarIcon: ({tintColor}) => {
      return (
        <Image
          source={require('../image/history.png')}
          style={{tintColor: tintColor, width: 26, height: 26}}></Image>
      );
    },
  };
  render() {
    return (
      <View>
        <Text>Lich Su</Text>
      </View>
    );
  }
}
