import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Style, Page, AppNav, Const, UserInfo } from 'common';
import { Button, Input, Toast } from 'fego-rn';

const localStyle = StyleSheet.create({
  text: {
    fontSize: 24,
    color: Const.textColor,
    marginTop: 100,
    textAlign: 'center',
    marginBottom: 100,
  },
  container: {
    backgroundColor: '#fff',
  },
});

export default class LoginPage extends Page {
  constructor(props) {
    super(props);
    this.name = '';
    this.pwd = '';
    this.state = {
      userInfo: '',
    };
    UserInfo.isLogin = false;
  }
  onReady() {
    this._initUserInfo();
  }
  _initUserInfo = () => {
    UserInfo.getCacheUserInfo((e) => {
      this.setState({
        userInfo: e,
      });
    });
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
    const { name, pwd } = this;
    if (this.isValid(name, pwd)) {
      UserInfo.login(name);
      AppNav.root();
    }
  }
  render() {
    let defaultName;
    const { name } = this;
    const { userInfo } = this.state;
    if (name) {
      defaultName = name;
    } else if (userInfo && userInfo.userName) {
      defaultName = userInfo.userName;
    }
    this.name = defaultName;
    return (
      <ScrollView style={Style.container} keyboardShouldPersistTaps="handled">
        <Text style={localStyle.text}>账号密码登录</Text>
        <Input
          styles={{
            container: { marginLeft: 20, marginRight: 20, paddingRight: 0 },
            input: { backgroundColor: 'transparent' },
          }}
          defaultValue={defaultName}
          placeholder="请输入账号"
          onChange={(v) => {
            this.name = v;
          }}
        />
        <Input
          type="password"
          styles={{
            container: {
              marginLeft: 20,
              marginRight: 20,
              marginTop: 10,
              paddingRight: 0,
            },
            input: { backgroundColor: 'transparent' },
          }}
          placeholder="请输入密码"
          onChange={(v) => {
            this.pwd = v;
          }}
        />
        <Button
          style={{ marginTop: 100, marginHorizontal: 20 }}
          type="primary"
          size="large"
          textColor="#ffffff"
          onPress={() => this.doLogin()}
        >登录
        </Button>
      </ScrollView>
    );
  }
}
