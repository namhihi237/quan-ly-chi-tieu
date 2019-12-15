import React, {Component} from 'react';
import {
  Container,
  Content,
  Form,
  List,
  ListItem,
  Text,
  Header,
} from 'native-base';
import {Alert, StyleSheet, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {LineChart, BarChart, ProgressChart} from 'react-native-chart-kit';

const chartConfig = {
  backgroundGradientFrom: 'red',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: 'red',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 0.6) => `rgba(26, 100, 36, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
};
export default class ReportScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      thu: 0,
      chi: 0,
      no: 0,
      vay: 0,
      dataLine: [],
      dataPro: [],
      labelLine: [],
      lablePro: [],
    };
  }
  async componentDidMount() {
    this.fetchData();
    this.onLoad();
  }
  onLoad = () => {
    this.props.navigation.addListener('willFocus', () => this.fetchData());
  };
  fetchData = async () => {
    try {
      let keys = await AsyncStorage.getAllKeys();
      let sum = await JSON.parse(await AsyncStorage.getItem('tong'));
      let data = [];
      let chi = sum.chi ? parseFloat(sum.chi) : 0;
      let thu =  sum.thu ? parseFloat(sum.thu) : 0;
      let no =  sum.no ? parseFloat(sum.no) : 0;
      let vay =  sum.vay ? parseFloat(sum.vay) : 0;
      this.setState({thu, chi, no, vay});
      let dataLine1 = [];
      let labelLine1 = [];
      let dataLine = [];
      let labelLine = [];
      keys.forEach(async key => {
        if (key !== 'tong') {
          let item = await JSON.parse(await AsyncStorage.getItem(key));
          data.push(item);
          dataLine1.push(item.money);
          labelLine1.push(item.chosenDate);
        }
        dataLine = dataLine1.slice(dataLine1.length - 3);
        labelLine = labelLine1.slice(labelLine1.length - 3);
      });

      setTimeout(() => {
        let {chi, thu, no, vay} = this.state;
        let tong = chi + vay + thu + no;
        let dataPro = [chi / tong, thu / tong, no / tong, vay / tong];
        let obj = {};
        let newDataLine = [];
        for (let i = 0; i < labelLine.length; i++) {
          Object.assign(obj, {[labelLine[i]]: 0});
        }
        const newLabelLine = Object.keys(obj);
        for (let i = 0; i < newLabelLine.length; i++) {
          let money = 0;
          for (let j = 0; j < dataLine.length; j++) {
            if (labelLine[j] === newLabelLine[i]) {
              money = money + parseFloat(dataLine[j]);
            }
          }
          newDataLine.push(money);
        }
        this.setState({
          dataList: data,
          dataLine: newDataLine,
          labelLine: newLabelLine,
          dataPro,
        });
      }, 150);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const formatMoney = text => {
      return text.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    };
    const {thu, chi, no, vay} = this.state ;
    const soDo = parseFloat(thu) - parseFloat(chi);
    const validate = (money) =>{
      return money? formatMoney(parseFloat(money)) : null; 
    }
    return (
      <Container>
        <Header style={styles.header}>
          <Text style={styles.textHeader}>Báo Cáo Chi Tiêu</Text>
        </Header>
        <List>
          <ListItem>
            <Form>
              <Text style={styles.textLabel}>
                Tổng thu: {validate(thu)} VNĐ{` `}
              </Text>
              <Text style={styles.textLabel}>
                Tổng chi: {validate(chi)} VNĐ
              </Text>
              <Text style={styles.textLabel}>Tổng nợ: {validate(no)} VNĐ</Text>
              <Text style={styles.textLabel}>
                Cho vay: {validate(vay)} VNĐ
              </Text>
              <Text style={styles.textSodu}>
                => Số dư :
                {validate(soDu)} VNĐ
              </Text>
            </Form>
          </ListItem>
          <ListItem>
            <BarChart
              data={{
                labels: this.state.labelLine, // this.state.lableBar
                datasets: [
                  {
                    data: this.state.dataLine, // this.state.dataBar
                  },
                ],
              }}
              width={(Dimensions.get('window').width * 10) / 11}
              height={180}
              yAxisLabel={'$'}
              chartConfig={chartConfig}
              verticalLabelRotation={0}
            />
          </ListItem>
          <ListItem>
            <ProgressChart
              data={{
                labels: ['Chi', 'Thu', 'No', 'Vay'], // optional
                data: this.state.dataPro,
              }}
              width={(Dimensions.get('window').width * 10) / 11}
              height={200}
              chartConfig={{
                backgroundGradientFrom: 'red',
                backgroundGradientFromOpacity: 0,
                backgroundGradientTo: 'red',
                backgroundGradientToOpacity: 0.5,
                color: (opacity = 0.5) => `rgba(76, 200, 85, ${opacity})`,
                strokeWidth: 2, // optional, default 3
                barPercentage: 0.5,
              }}
            />
          </ListItem>
        </List>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  textLabel: {
    fontSize: 15,
  },
  textSodu: {
    fontSize: 15,
    color: 'red',
  },
  textHeader: {
    fontSize: 25,
    color: '#00008B',
    marginTop: 10,
  },
  header: {
    backgroundColor: '#5F9EA0',
  },
  chart: {
    flex: 1,
  },
});
