import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
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
export default class AddScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      money: '',
      selected: 'danhmuc01',
      type: 'loai',
      chosenDate: new Date(),
      note: '',
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
  handleButtonSave = () => {
    const {money, selected, type, note, chosenDate} = this.state;
    this.props.navigation.setParams({
      money,
      selected,
      type,
      note,
      chosenDate,
    });
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
              <Picker.Item label="Tiền Internet" value="danhmuc08" />
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
              <Picker.Item label="Thu tiền" value="loai01" />
              <Picker.Item label="Chi tiền" value="loai02" />
              <Picker.Item label="Cho vay" value="loai03" />
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
              />
            </Form>
          </Content>
          <Content>
            <Text>Thời Gian: </Text>
            <DatePicker
              defaultDate={new Date()}
              minimumDate={new Date(2018, 1, 1)}
              maximumDate={new Date(2020, 12, 31)}
              locale={'en'}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={'fade'}
              androidMode={'default'}
              placeHolderText="Select date"
              textStyle={{color: 'green'}}
              placeHolderTextStyle={{color: 'red'}}
              onDateChange={this.setDate}
              disabled={false}
            />
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
    marginTop: 30,
  },
  buttonText: {
    marginLeft: 40,
  },
});
