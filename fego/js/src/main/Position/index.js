import { View, Text } from 'react-native';
import { Style, Page } from 'common';
import React from 'react';
import SearchBar from './SearchBar';
import ResidentModule from './ResidentModule';
import FunctionModule from './FunctionModule';

export default class PositionPage extends Page {
  render() {
    return (
      <View style={[Style.container, { justifyContent: 'flex-start', alignItems: 'center' }]}>
        <SearchBar />
        <ResidentModule />
        <FunctionModule />
        <Text style={{ color: '#FFF' }}>REST</Text>
      </View>
    );
  }
}
