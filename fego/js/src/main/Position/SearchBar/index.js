import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Style, Page } from 'common';
import React from 'react';
import { Icon, Button } from 'fego-rn'

/**
 * 搜索栏，包含弹出模态搜索页，跳转朋友页面，弹出模态快速选项框
 */
export default class SearchBar extends React.Component {
  constructor(props) {
    super(props)

  }
  _onPressFriend = () => {

  }
  _onPressQuick = () => {

  }
  _onPressSearch = () => {

  }

  render() {
    return (
      <View style={baseStyle.container}>
        {/* 搜索栏 */}
        <View style={baseStyle.searchBgView} >
          <TouchableHighlight
            underlayColor='#0033ff'
            style={baseStyle.searchTouchStyle}
            onPress={this._onPressSearch}>
            <View style={baseStyle.searchView}>
              <Image source={require('../Assert/clock.png')} style={{ marginLeft: 15, width: 15, height: 15 }} />
              <Text style={baseStyle.searchBarText}>附近美食</Text>
              <Image source={require('../Assert/home.png')} style={{ marginRight: 15, width: 15, height: 15 }} />
            </View>
          </TouchableHighlight>
        </View>
        {/* 朋友&快捷入口 */}
        <View style={baseStyle.buttonBgView}>
          {/* 朋友 */}
          <TouchableHighlight
            underlayColor='transparent'
            onPress={this._onPressFriend}>
            <Image source={require('../Assert/atm.png')} style={{ marginLeft: 5, marginRight: 5, width: 20, height: 20 }} />
          </TouchableHighlight>
          {/* 快捷入口 */}
          <TouchableHighlight
            underlayColor='transparent'
            onPress={this._onPressQuick}>
            <Image source={require('../Assert/account.png')} style={{ marginLeft: 5, marginRight: 5, width: 20, height: 20 }} />
          </TouchableHighlight>
        </View>
      </View >
    );
  }
}

var baseStyle = StyleSheet.create({
  container: {
    height: 70,
    paddingTop: 22,
    backgroundColor: '#0066ff',
    flexDirection: 'row',
  },
  searchBgView: {
    flex: 1,
    height: 60,
    backgroundColor: '#0066ff',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  searchTouchStyle: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
    height: 30,
    backgroundColor: '#0033ff',
    borderRadius: 5,
  },
  searchView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchBarText: {
    flex: 1,
    color: '#fff',
    marginLeft: 15,
  },
  buttonBgView: {
    width: 80,
    height: 60,
    backgroundColor: '#0066ff',
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  }


})
