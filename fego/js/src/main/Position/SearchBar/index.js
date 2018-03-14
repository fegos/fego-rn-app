import { View, Text, StyleSheet } from 'react-native';
import { Style, Page } from 'common';
import React from 'react';
import { Icon,Button } from 'fego-rn'

/**
 * 搜索栏，包含弹出模态搜索页，跳转朋友页面，弹出模态快速选项框
 */
export default class SearchBar extends React.Component {
  constructor(props) {
    super(props)

  }


  render() {
    return (
      <View style={baseStyle.container}>
        {/* 搜索栏 */}
        <View style={baseStyle.searchBgView} >
          {/* <Icon family='nsip' name='hook'/> */}
          <Text>123123</Text>
          {/* <Icon name='user' /> */}
        </View>
        {/* 朋友&快捷入口 */}
        <View style={baseStyle.buttonBgView}>
          {/* 朋友 */}
          <Button/>
          {/* 快捷入口 */}
          <Button/>
        </View>
      </View >
    );
  }
}

var baseStyle = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: 'yellow',
    flexDirection: 'row',
  },
  searchBgView:{
    flex: 1,
    height: 60,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonBgView:{
    width: 120,
    height: 60,
    backgroundColor: 'blue',
    flexDirection:'row'
  }


})
