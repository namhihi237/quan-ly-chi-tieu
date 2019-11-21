import React, {Component} from 'react';
import {Image, Alert} from 'react-native';
import {FloatingAction} from 'react-native-floating-action';
import {
  List,
  Button,
  Container,
  Content,
  Text,
  Header,
  ListItem,
} from 'native-base';
const Arr = [
  'nam',
  'thao',
  'diep',
  'ha',
  'thao',
  'diep',
  'ha',
  'thao',
  'diep',
  'ha',
  'thao',
  'diep',
  'ha',
  'thao',
  'diep',
  'ha',
];
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
      <Container>
        <Content>
          <List
            dataArray={Arr}
            renderRow={item => (
              <ListItem button onPress={() => Alert.alert('hello')}>
                <Text>{item}</Text>
                <Text note>chao cac ban</Text>
              </ListItem>
            )}></List>
        </Content>
        <FloatingAction
          onPressMain={() => {
            this.props.navigation.navigate('Add');
          }}
          showBackground={false}></FloatingAction>
      </Container>
    );
  }
}
