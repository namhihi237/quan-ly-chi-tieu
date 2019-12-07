import React, {Component} from 'react';
import {Image, Alert, StyleSheet} from 'react-native';
import {FloatingAction} from 'react-native-floating-action';
import AsyncStorage from '@react-native-community/async-storage';
import {List, Container, Text, ListItem, Form} from 'native-base';
export default class HistoryScreen extends Component {
  static navigationOptions = {
    swipeEnabled: true,
    title: 'Quản Lý Chi Tiêu',
  };
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      tong: {},
    };
    this.option = this.option.bind(this);
  }
  fetchData = async () => {
    try {
      let keys = await AsyncStorage.getAllKeys();
      let data = [];
      keys.forEach(async key => {
        let item = await JSON.parse(await AsyncStorage.getItem(key));
        // console.log(item);
        data.push(item);
      });
      setTimeout(() => {
        this.setState({dataList: data});
      }, 150);
    } catch (error) {
      console.log(error);
    }
  };
  async componentDidMount() {
    this.fetchData();
    this.onLoad();
  }
  onLoad = () => {
    this.props.navigation.addListener('willFocus', () => this.fetchData());
  };
  option = (item, id) => {
    const removeValue = async () => {
      try {
        await AsyncStorage.removeItem(id);
        console.log('Remove item has id : ' + id);
      } catch (e) {
        console.log(e);
      }
    };
    Alert.alert(`Danh mục`, `Nhấn lựa chọn của bạn`, [
      {
        text: 'Edit',
        onPress: () => {
          this.props.navigation.navigate('Edit', {
            id: item.id,
            money: item.money,
            selected: item.selected,
            type: item.type,
            chosenDate: item.chosenDate,
            note: item.note,
          });
        },
      },
      {
        text: 'Delete',
        onPress: () => {
          const list = this.state.dataList;
          let key;
          list.map((item, index) => {
            let spending = Object.keys(item).find(
              attribute => item[attribute] === item.id,
            );
            if (spending) {
              key = index;
            }
          });
          list.splice(key, 1);
          this.setState({dataList: list});
          removeValue();
        },
      },
      {text: 'Cancel', onPress: () => {}},
    ]);
  };
  render() {
    const formatMoney = text => {
      return text.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    };
    return (
      <Container>
        <List
          dataArray={this.state.dataList}
          keyExtractor={item => item.id}
          renderRow={item => (
            <ListItem
              button
              style={styles.container}
              delayLongPress={300}
              onLongPress={() => this.option(item, item.id)}>
              <Form>
                <Form style={styles.settingContainer}>
                  <Text style={styles.date}>{item.chosenDate}</Text>
                </Form>
                <Form style={styles.botcontaine}>
                  <Text note style={styles.danhmuc}>
                    {item.selected}
                  </Text>
                  <Text note style={styles.money}>
                    {item.money ? formatMoney(item.money) : 0}
                    <Text note style={styles.money}>
                      vnđ
                    </Text>
                  </Text>
                </Form>
                <Text note>{item.note ? `Ghi chú :${item.note}` : null}</Text>
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
  settingContainer: {
    flexDirection: 'row',
  },
});
