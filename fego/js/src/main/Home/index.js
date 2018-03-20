import { View, Text } from 'react-native';
import { Style, Page, UserInfo } from 'common';
import React from 'react';
import { Button } from 'fego-rn';

export default class Home extends Page {
  logout = () => {
    UserInfo.loginOut();
  }

  render() {
    return (
      <View style={[Style.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: '#FFF' }}>Home</Text>
        <Button
          style={{ marginTop: 100, marginHorizontal: 20 }}
          type="primary"
          size="default"
          textColor="#ffffff"
          onPress={() => this.logout()}
        >测试登出
        </Button>
      </View>
    );
  }
}
