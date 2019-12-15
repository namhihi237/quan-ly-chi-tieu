import React, {Component} from 'react';
import {Image, Alert, StyleSheet} from 'react-native';
import {FloatingAction} from 'react-native-floating-action';
import AsyncStorage from '@react-native-community/async-storage';
import {List, Container, Text, ListItem, Form} from 'native-base';
const actions = [
  {
    text: 'tăng dần',
    icon: require('../image/des.png'),
    name: 'tang',
    position: 2,
  },
  {
    text: 'add',
    icon: require('../image/add.png'),
    name: 'add',
    position: 3,
  },
  {
    text: 'giảm dần',
    icon: require('../image/asc.png'),
    name: 'giam',
    position: 1,
  },
];
const loais = {
  loai01: 'Tiền Chi',
  loai02: 'Tiền Thu',
  loai03: 'Cho Vay',
  loai04: 'Nợ',
};
export default class HistoryScreen extends Component {
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
        if (key !== 'tong') {
          let item = await JSON.parse(await AsyncStorage.getItem(key));
          data.push(item);
        }
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
    const keyTong='tong';
    const removeValue = async () => {
      try {
        await AsyncStorage.removeItem(id);
        console.log('Remove item has id : ' + id);
      } catch (e) {
        console.log(e);
      };
    };
    const updateTong = async () => {
      try {
        let sum = await JSON.parse(await AsyncStorage.getItem(keyTong));
        if(sum){
        if (item.type === loais.loai01)
          sum.chi = sum.chi - parseInt(item.money);
        if (item.type === loais.loai02)
          sum.thu = sum.thu - parseInt(item.money);
        if (item.type === loais.loai03)
          sum.vay = sum.vay - parseInt(item.money);
        if (item.type === loais.loai04)
          sum.no = sum.no - parseInt(item.money);
        await AsyncStorage.setItem(keyTong, JSON.stringify(sum));
        }
        console.log(sum);
      } catch (e) {
        console.log(e);
      };
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
          updateTong();
          this.fetchData();
        },
      },
      {text: 'Cancel', onPress: () => {}},
    ]);
  };
  sortAsc = () => {
    let dataAsc = [];
    dataAsc = this.state.dataList;
    for (let i = 0; i < dataAsc.length - 1; i++) {
      for (let j = i + 1; j < dataAsc.length; j++) {
        if (parseFloat(dataAsc[i].money) > parseFloat(dataAsc[j].money)) {
          [dataAsc[i], dataAsc[j]] = [dataAsc[j], dataAsc[i]];
        }
      }
    }
    this.setState({dataList: dataAsc});
  };
  sortDes = () => {
    let dataAsc = [];
    dataAsc = this.state.dataList;
    for (let i = 0; i < dataAsc.length - 1; i++) {
      for (let j = i + 1; j < dataAsc.length; j++) {
        if (parseFloat(dataAsc[i].money) < parseFloat(dataAsc[j].money)) {
          [dataAsc[i], dataAsc[j]] = [dataAsc[j], dataAsc[i]];
        }
      }
    }
    this.setState({dataList: dataAsc});
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
                <Text note style={styles.note}>{item.note ? (`Ghi chú :${item.note}`) : null}</Text>
                <Text note style={styles.type}>{item.type ? `${item.type}` : null}</Text>
              </Form>
            </ListItem>
          )}></List>
        <FloatingAction
          onPressItem={name => {
            if (name === 'add') {
              this.props.navigation.navigate('Add');
            }
            if (name === 'tang') {
              this.sortAsc();
            }
            if (name === 'giam') {
              this.sortDes();
            }
          }}
          showBackground={true}
          actions={actions}></FloatingAction>
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
    fontFamily: 'vincHand',
    marginLeft: 100,
    fontSize: 25,
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
  type: {
    fontSize: 13,
    color: '#cd2222'
  },
  note: {
    color: '#b46417',
    fontSize: 13
  }
});
