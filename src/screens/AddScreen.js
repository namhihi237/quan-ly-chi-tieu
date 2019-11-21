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
} from 'native-base';
export default class AddScreen extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Form style={styles.formMoneyContainer}>
            <Content>
              <Item rounded style={styles.InputMoney}>
                <Label style={styles.labelMoney}>Số Tiền</Label>
                <Input placeholder="Nhập số tiền"></Input>
              </Item>
            </Content>
          </Form>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  formMoneyContainer: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  labelMoney: {
    marginLeft: 10,
    marginRight: 30,
  },
  InputMoney: {
    backgroundColor: '#A9A9A9',
  },
});
