import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {
  Container,
  Content,
  Button,
  Text,
  Form,
  Input,
  Label,
  Item,
  Picker,
  Textarea,
  DatePicker,
} from 'native-base';
var item = {
  id: '',
  money: '',
  selected: '',
  type: '',
  note: '',
  chosenDate: '',
};
const danhmucs = {
  danhmuc01: 'Mua sắm',
  danhmuc02: 'Học Phí',
  danhmuc03: 'Ăn Uống',
  danhmuc04: 'Đổ Xăng',
  danhmuc05: 'Tiền Nhà',
  danhmuc06: 'Tiền Điện',
  danhmuc07: 'Tiền Thẻ ĐT',
  danhmuc08: 'Tiền Tán Gái/Trai',
  danhmuc09: 'Mừng Cưới',
  danhmuc10: 'Tiền Sửa Đồ',
  danhmuc11: 'Làm Đẹp',
  danhmuc12: 'Cà Phê Trà Sữa',
  danhmuc13: 'Khám Bệnh',
  danhmuc14: 'Đầu Tư Kinh Doanh',
  danhmuc15: 'Tiền Lương',
  danhmuc16: 'Phụ Cấp',
  danhmuc17: 'Tiết Kiệm',
};
const danhmucsSer = {
  'Mua sắm': 'danhmuc01',
  'Học Phí': 'danhmuc02',
  'Ăn Uống': 'danhmuc03',
  'Đổ Xăng': 'danhmuc04',
  'Tiền Nhà': 'danhmuc05',
  'Tiền Điện': 'danhmuc06',
  'Tiền Thẻ ĐT': 'danhmuc07',
  'Tiền Tán Gái/Trai': 'danhmuc08',
  'Mừng Cưới': 'danhmuc09',
  'Tiền Sửa Đồ': 'danhmuc10',
  'Làm Đẹp': 'danhmuc11',
  'Cà Phê Trà Sữa': 'danhmuc12',
  'Khám Bệnh': 'danhmuc13',
  'Đầu Tư Kinh Doanh': 'danhmuc14',
  'Tiền Lương': 'danhmuc15',
  'Phụ Cấp': 'danhmuc16',
  'Tiết Kiệm': 'danhmuc17',
};
const loais = {
  loai01: 'Tiền Chi',
  loai02: 'Tiền Thu',
  loai03: 'Cho Vay',
  loai04: 'Nợ',
};
const loaisSer = {
  'Tiền Chi': 'loai01',
  'Tiền Thu': 'loai02',
  'Cho Vay': 'loai03',
  Nợ: 'loai04',
};
export default class UpdateScreen extends Component {
  static navigationOptions = {
    title: 'Sửa Chi Tiêu',
  };
  constructor(props) {
    super(props);
    this.state = {
      money: this.props.navigation.getParam('money'),
      selected: danhmucsSer[this.props.navigation.getParam('selected')],
      type: loaisSer[this.props.navigation.getParam('type')],
      chosenDate: new Date(),
      note: this.props.navigation.getParam('note'),
      chosenTime: '',
      isDateTimePickerVisible: false,
    };
    this.setDate = this.setDate.bind(this);
  }
  onValueChangeMoney(value) {
    this.setState({
      selected: value,
    });
  }
  onValueChangeType(value) {
    this.setState({
      type: value,
    });
  }
  setDate(newDate) {
    this.setState({chosenDate: newDate});
  }
  handleChangTextMoney = text => {
    this.setState({money: text});
  };
  handleChangeTextNote = text => {
    this.setState({note: text});
  };
  handleButtonSave = async () => {
    const keyTong='tong';
    const {money, selected, type, note, chosenDate} = this.state;
    var newItem = item;
    newItem.id = this.props.navigation.getParam('id');
    newItem.money = money;
    newItem.selected = danhmucs[selected];
    newItem.type = loais[type];
    newItem.note = note;
    newItem.chosenDate = chosenDate.toString().substr(4, 12);
    let key = newItem.id;
    try {
      let sum = await JSON.parse(await AsyncStorage.getItem(keyTong));
      if(sum){
      if (item.type === loais.loai01)
        sum.chi = sum.chi - parseInt(money);
      if (item.type === loais.loai02)
        sum.thu = sum.thu - parseInt(money);
      if (item.type === loais.loai03)
        sum.vay = sum.vay - parseInt(money);
      if (item.type === loais.loai04)
        sum.no = sum.no - parseInt(money);
      await AsyncStorage.setItem(keyTong, JSON.stringify(sum));
      }
      console.log(sum);
    } catch (e) {
      console.log(e);
    }
      //
    try {
      await AsyncStorage.setItem(key, JSON.stringify(newItem));
      this.props.navigation.navigate('History');
    } catch (error) {
      console.log(error);
    }
  };
  showDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: true});
    console.log(this.state.chosenTime);
  };
  hideDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: false});
  };
  handleDatePicked = date => {
    console.log('A date has been picked: ', date);
    this.hideDateTimePicker();
  };
  render() {
    return (
      <Container>
        <Content style={styles.containerMain}>
          <Form style={styles.formMoneyContainer}>
            <Item rounded style={styles.InputMoney}>
              <Label style={styles.labelMoney}>Số Tiền</Label>
              <Input
                placeholder="Nhập số tiền"
                keyboardType="numeric"
                defaultValue={this.state.money}
                onChangeText={this.handleChangTextMoney}></Input>
            </Item>
          </Form>
          <Content style={styles.danhmuc}>
            <Text>Danh Mục</Text>
            <Picker
              style={styles.pick}
              mode="dropdown"
              selectedValue={this.state.selected}
              onValueChange={this.onValueChangeMoney.bind(this)}>
              <Picker.Item label="Mua sắm" value="danhmuc01" />
              <Picker.Item label="Học Phí" value="danhmuc02" />
              <Picker.Item label="Ăn Uống" value="danhmuc03" />
              <Picker.Item label="Đổ Xăng" value="danhmuc04" />
              <Picker.Item label="Tiền Nhà" value="danhmuc05" />
              <Picker.Item label="Tiền Điện" value="danhmuc06" />
              <Picker.Item label="Tiền Thẻ ĐT" value="danhmuc07" />
              <Picker.Item label="Tiền tán gái/trai" value="danhmuc08" />
              <Picker.Item label="Mừng Cưới" value="danhmuc09" />
              <Picker.Item label="Tiền Sửa Đồ" value="danhmuc10" />
              <Picker.Item label="Làm Đẹp" value="danhmuc11" />
              <Picker.Item label="Cà Phê Trà Sữa" value="danhmuc12" />
              <Picker.Item label="Khám Bệnh" value="danhmuc13" />
              <Picker.Item label="Đầu Tư Kinh Doanh" value="danhmuc14" />
              <Picker.Item label="Tiền Lương" value="danhmuc15" />
              <Picker.Item label="Phụ Cấp" value="danhmuc16" />
              <Picker.Item label="Tiết Kiệm" value="danhmuc17" />
            </Picker>
          </Content>
          <Content style={styles.danhmuc}>
            <Text>Loại Thu Chi</Text>
            <Picker
              style={styles.pick}
              mode="dropdown"
              selectedValue={this.state.type}
              onValueChange={this.onValueChangeType.bind(this)}>
              <Picker.Item label="Tiền Chi" value="loai01" />
              <Picker.Item label="Tiền Thu" value="loai02" />
              <Picker.Item label="Cho Vay" value="loai03" />
              <Picker.Item label="Nợ" value="loai04" />
            </Picker>
          </Content>
          <Content padder>
            <Form>
              <Label>Ghi Chú :</Label>
              <Textarea
                onChangeText={this.handleChangeTextNote.bind(this)}
                rowSpan={3}
                bordered
                placeholder="Nhập ghi chú..."
                defaultValue={this.state.note}
              />
            </Form>
          </Content>
          <Content>
            <Text>Thời Gian: </Text>
            <Form style={styles.dateTime}>
              <Button style={styles.buttonTime}>
                <DatePicker
                  defaultDate={new Date()}
                  minimumDate={new Date(2018, 1, 1)}
                  maximumDate={new Date(2020, 12, 31)}
                  locale={'vi'}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={'fade'}
                  androidMode={'default'}
                  placeHolderText="Select date"
                  textStyle={{color: 'green'}}
                  placeHolderTextStyle={{color: 'red', fontSize: 18}}
                  onDateChange={this.setDate}
                  disabled={false}
                />
              </Button>

              <Button
                onPress={this.showDateTimePicker}
                style={styles.buttonTime}>
                <Text>Select Time</Text>
              </Button>
              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this.handleDatePicked}
                onCancel={this.hideDateTimePicker}
                mode="time"
                timePickerModeAndroid="clock"
              />
            </Form>
            <Text>Date: {this.state.chosenDate.toString().substr(4, 12)}</Text>
          </Content>
          <Form style={styles.buttonContainer}>
            <Button
              success
              style={styles.buttonSave}
              onPress={this.handleButtonSave}>
              <Text style={styles.buttonText}>Save</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  formMoneyContainer: {
    marginTop: 20,
  },
  labelMoney: {
    marginLeft: 10,
    marginRight: 30,
  },
  InputMoney: {
    backgroundColor: '#A9A9A9',
    marginBottom: 20,
  },
  InputDanhMuc: {
    backgroundColor: '#A9A9A9',
    padding: 10,
  },
  labelDanhMuc: {
    marginLeft: 10,
    marginRight: 50,
  },
  danhmuc: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  containerMain: {
    marginHorizontal: 10,
  },
  pick: {
    marginRight: 100,
  },
  buttonSave: {
    width: 150,
    borderRadius: 6,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    marginLeft: 40,
  },
  buttonTime: {
    width: 150,
  },
  dateTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
