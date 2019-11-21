import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Container,
  Content,
  Button,
  Text,
  Form,
  Input,
  Label,
  Item,
  Icon,
  Picker,
  Textarea,
  DatePicker,
} from 'native-base';
export default class AddScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'key01',
      type: 'key01',
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
  handleChangeTextNote = text => {
    this.setState({note: text});
  };
  render() {
    return (
      <Container>
        <Content style={styles.containerMain}>
          <Form style={styles.formMoneyContainer}>
            <Item rounded style={styles.InputMoney}>
              <Label style={styles.labelMoney}>Số Tiền</Label>
              <Input placeholder="Nhập số tiền"></Input>
            </Item>
          </Form>
          <Content style={styles.danhmuc}>
            <Text>Danh Muc</Text>
            <Picker
              style={styles.pick}
              mode="dropdown"
              selectedValue={this.state.selected}
              onValueChange={this.onValueChangeMoney.bind(this)}>
              <Picker.Item label="Mua sắm" value="key01" />
              <Picker.Item label="Học Phí" value="key02" />
              <Picker.Item label="Ăn uống" value="key03" />
            </Picker>
          </Content>
          <Content style={styles.danhmuc}>
            <Text>Loai thu chi</Text>
            <Picker
              style={styles.pick}
              mode="dropdown"
              selectedValue={this.state.type}
              onValueChange={this.onValueChangeType.bind(this)}>
              <Picker.Item label="Thu tiền" value="key01" />
              <Picker.Item label="Chi tiền" value="key02" />
              <Picker.Item label="Cho vay" value="key03" />
              <Picker.Item label="Nợ" value="key04" />
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
            <Button success style={styles.buttonSave}>
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
    marginRight: 80,
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
    marginRight: 250,
  },
  buttonSave: {
    width: 150,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  buttonText: {
    marginLeft: 40,
  },
});
