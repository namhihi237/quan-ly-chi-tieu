import React, {Component} from 'react';
import {Button, Text, View, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { 
  Container,
  Content,
  List,
  ListItem,
  Body,
  Left,
  Right,
  Form,
  Picker,
} from 'native-base';
export default class ReportScreen extends Component {
  static navigationOptions = {
    swipeEnabled: true,
    title: 'Báo cáo',
  };
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      isLoading: false,
    };
  }
  fetchData = async () => {
    try {
      let keys = await AsyncStorage.getAllKeys();
      let data = [];
      keys.forEach(async key => {
        let item = await JSON.parse(await AsyncStorage.getItem(key));
        data.push(item);
      });
      this.setState({dataList: data});
    } catch (error) {
      console.log(error);
    }
  };
  async componentDidMount() {
    this.fetchData();
    this.onCalculateData();
    this.onLoad();
  }
  onLoad = () => {
    this.props.navigation.addListener('willFocus', () => this.fetchData());
  };
  onCalculateData = () => {
    const { dataList:cal } = this.state;
    console.log(cal);
  }
  // static navigationOptions = {
  //   swipeEnabled: true,
  //   tabBarIcon: ({tintColor}) => {
  //     return (
  //       <Image
  //         source={require('../image/report.png')}
  //         style={{tintColor: tintColor, width: 26, height: 26}}></Image>
  //     );
  //   },
  // };
  toDayReport = () => {

  }
  yesterdayReport = () => {
    
  }
  render() {
    return (
      <Container>
        <Content><Text>Tổng thu:{`500.000vnđ`}</Text>
        <Text>Tổng chi:{`400.000vnđ`}</Text>
        <Text>Số dư:{`300.000vnđ`}</Text>
        <Text>Số nợ còn lại:{`200.000vnđ`}</Text>
        <Text>Số Tiền cho vay:{`100.000vnđ`}</Text>
        </Content>
        {/* <List
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
                <Text note>
                  {item.note ? `Ghi chú :${item.note}` : null }
                </Text>
              </Form>
            </ListItem>
          )}></List> */}
      </Container>
    );
  }
}
