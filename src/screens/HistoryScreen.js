import React, {Component} from 'react';
import {Image, Alert, StyleSheet} from 'react-native';
import {FloatingAction} from 'react-native-floating-action';
import AsyncStorage from '@react-native-community/async-storage';
import {
  List,
  Button,
  Container,
  Content,
  Text,
  ListItem,
  Body,
  Left,
  Right,
  Form,
} from 'native-base';
export default class HistoryScreen extends Component {
  static navigationOptions = {
    swipeEnabled: true,
    title: 'Quản Lý Chi Tiêu',
  };
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
    };
  }
  async componentDidMount() {
    try {
      let keys = await AsyncStorage.getAllKeys();
      keys.forEach(async key => {
        let item = await JSON.parse(await AsyncStorage.getItem(key));
        let data = this.state.dataList.concat(item);
        this.setState({dataList: data});
      });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <Container>
        <List
          dataArray={this.state.dataList}
          keyExtractor={item => item.id}
          renderRow={item => (
            <ListItem button style={styles.container}>
              <Form>
                <Text style={styles.date}>{item.chosenDate}</Text>
                <Form style={styles.botcontaine}>
                  <Text note style={styles.danhmuc}>
                    {item.selected}
                  </Text>
                  <Text note style={styles.money}>
                    {item.money}
                  </Text>
                </Form>
                <Text note>
                  {item.note === '' ? item.note : `Ghi chú :${item.note}`}
                </Text>
              </Form>
            </ListItem>
          )}></List>
        <FloatingAction
          onPressMain={() => {
            this.props.navigation.navigate('Add');
          }}
          showBackground={false}></FloatingAction>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F8FF',
    marginRight: 10,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  date: {
    marginLeft: 100,
  },
  danhmuc: {
    marginTop: 40,
  },
  money: {
    marginTop: 40,
    color: '#9400D3',
  },
  botcontaine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 290,
  },
});
