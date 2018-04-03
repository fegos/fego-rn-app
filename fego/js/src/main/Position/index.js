import { View, Text } from 'react-native';
import { Style, Page } from 'common';
import React from 'react';
import { RefreshView } from 'fego-rn';
import SearchBar from './SearchBar';
import ResidentModule from './ResidentModule';
import FunctionModule from './FunctionModule';

export default class PositionPage extends Page {

  _onRefresh = (refreshView)=>{
    setTimeout(() => {
      refreshView.refreshed();
    }, 1500);
  }
  render() {
    return (
      <View style={[Style.container, { justifyContent: 'flex-start', alignItems: 'center' }]}>
        <SearchBar />
        <ResidentModule />
        <FunctionModule />
        <RefreshView onRefresh={this._onRefresh}>
          <Text style={{ color: '#000' }}>可下拉的剩余组件</Text>
        </RefreshView>
      </View>
    );
  }
}
