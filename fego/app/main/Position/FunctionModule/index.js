import { View, Text, StyleSheet } from 'react-native';
import { Style, Page } from '@/common';
import React from 'react';
import { Icon, Button } from 'fego-rn'
import IconWithName from './iconWithName'

/**
 * 常用功能展示模块
 */
export default class FunctionModule extends React.Component {
  constructor(props) {
    super(props)
    this.functionList = [
      { 'name': '转账', 'iconName': require('../Assert/trade-assurance.png')  },
      { 'name': '信用卡还款', 'iconName': require('../Assert/Smile.png') },
      { 'name': '充值中心', 'iconName': require('../Assert/map.png') },
      { 'name': '余额宝', 'iconName': require('../Assert/auto.png')},
      { 'name': '花呗', 'iconName':require('../Assert/good.png')},
      { 'name': '滴滴出行', 'iconName': require('../Assert/electrical.png') },
      { 'name': '城市服务', 'iconName': require('../Assert/discount.png') },
      { 'name': '芝麻信用', 'iconName': require('../Assert/discount.png') },
      { 'name': '火车票机票', 'iconName': require('../Assert/discount.png') },
      { 'name': '商家服务', 'iconName': require('../Assert/discount.png') },
      { 'name': '更多', 'iconName': require('../Assert/discount.png') }];

  }

  _generateColumnItems = (columnNumber) => {

    const items = [];
    const startIndex = 4 * columnNumber;
    const itemViews = [];
    for (let index = startIndex; index < startIndex + 4; index++) {
      items.push(this.functionList[index]);
    }
    itemViews.push(
      <View
        key={'columnNumber' + columnNumber}
        style={baseStyle.columnBgView}>
        <IconWithName name={items[0].name} iconName={items[0].iconName} />
        <IconWithName name={items[1].name} iconName={items[1].iconName} />
        <IconWithName name={items[2].name} iconName={items[2].iconName} />
        <IconWithName name={items[3].name} iconName={items[3].iconName} />
      </View>
    )
    return itemViews;
  }

  _generateColumn = () => {
    const colunmCount = this.functionList.length / 4;
    const column = [];
    for (let index = 0; index < colunmCount; index++) {
      column.push(this._generateColumnItems(index));
    }
    return column;
  }

  render() {

    const colunmCount = this.functionList.length / 4;
    const itemsInLastColumn = this.functionList.length % 4;
    // 一排不够四个也要补空处理，保证统一flex自动布局
    for (let index = itemsInLastColumn; index < 4; index++) {
      this.functionList.push({ 'name': '', 'iconName': '' })
    }
    console.log('colunmCount:' + colunmCount + '; itemsInLastColumn:' + itemsInLastColumn);

    return (
      <View style={baseStyle.container}>
        <View style={baseStyle.bgView}>
          {this._generateColumn()}
        </View>


      </View>
    );
  }
}
var baseStyle = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  bgView: {
    flexDirection: 'column',
    flex: 1,
  },
  columnBgView: {
    height:90,
    flexDirection: 'row',
    backgroundColor: 'white',
  }



})
