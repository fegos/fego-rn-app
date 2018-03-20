import React from 'react';
import { View, Text } from 'react-native';
import { Style, Page } from 'common';

export default class PositionPage extends Page {
  render() {
    return (
      <View style={[Style.container, { justifyContent: 'flex-start', alignItems: 'center' }]}>
        <Text style={{ color: '#FFF' }}>Test Content</Text>
      </View>
    );
  }
}
