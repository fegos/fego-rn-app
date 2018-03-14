import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Style, Page, AppNav, Const, UserInfo } from 'common';
import { Button, Input, Toast } from 'fego-rn';

const localStyle = StyleSheet.create({
  text: {
    fontSize: 24,
    color: Const.textColor2,
    marginTop: 100,
    textAlign: 'center',
    marginBottom: 100,
  },
});

export default class LoginPage extends Page {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      pwd: '',
    };
  }
  isValid = (name, pwd) => {
    if (!name) {
      Toast.info('请输入账号！');
      return false;
    } else if (!pwd) {
      Toast.info('请输入密码！');
      return false;
    } else {
      return true;
    }
  }
  doLogin = () => {
    const { name, pwd } = this.state;
    if (this.isValid(name, pwd)) {
      UserInfo.login();
      AppNav.root();
    }
  }
  render() {
    return (
      <ScrollView style={Style.container} >
        <Text style={localStyle.text}>账号密码登录</Text>
        <Input
          style={{ marginLeft: 20, marginRight: 20, paddingRight: 0 }}
          last
          value={this.state.name}
          placeholder="请输入账号"
          onChange={(v) => {
            this.setState({
              name: v,
            });
          }}
        />
        <Input
          style={{
            marginLeft: 20,
            marginRight: 20,
            marginTop: 10,
            paddingRight: 0,
          }}
          last
          placeholder="请输入密码"
          value={this.state.pwd}
          onChange={(v) => {
            this.setState({
              pwd: v,
            });
          }}
        />
        <Button
          style={{ marginTop: 100, marginHorizontal: 20 }}
          type="primary"
          size="large"
          textColor="#ffffff"
          onPress={() => this.doLogin()}
        >测试登录
        </Button>
      </ScrollView>
    );
  }
}
