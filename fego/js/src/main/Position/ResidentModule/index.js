import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Style, Page } from 'common';
import React from 'react';
import { Icon, Button } from 'fego-rn'

/**
 * 常驻功能模块，
 */
export default class ResidentModule extends React.Component {
  constructor(props) {
    super(props)
    this.residentList = [
      { 'name': '扫一扫' },
      { 'name': '付钱' },
      { 'name': '收钱' },
      { 'name': '卡包' }];

  }
  _onPress = () => {

  }
  _generateItem = () => {
    const items = [];
    for (var index = 0; index < this.residentList.length; index++) {
      items.push((
        <TouchableHighlight
          underlayColor='transparent'
          style={baseStyle.touchStyle}
          key={this.residentList[index].name}
          onPress={this._onPress}>
          <View style={baseStyle.itemBgView}>
            <Text style={baseStyle.name}>icon</Text>
            <Text style={baseStyle.name}>{this.residentList[index].name}</Text>
          </View>
        </TouchableHighlight>
      ))
    }
    return items;
  }

  render() {
    return (
      <View style={baseStyle.container}>
        {/* 四个常驻功能：扫一扫；付钱；收钱；卡包 */}
        <View style={baseStyle.bgView}>
          {this._generateItem()}
        </View>
      </View>
    );
  }
}

var baseStyle = StyleSheet.create({
  container: {
    height: 120,
    backgroundColor: 'blue',
    flexDirection: 'row',
  },
  bgView: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  touchStyle:{
    flex: 1,
  },
  itemBgView: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    color: 'white',
    fontSize: 14,
    marginTop: 15,
  }


})
