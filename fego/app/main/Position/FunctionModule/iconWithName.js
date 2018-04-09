import { View, Text, StyleSheet, TouchableHighlight,Image } from 'react-native';
import { Style, Page } from '@/common';
import PropTypes from 'prop-types'
import React from 'react';
import { Icon, Button } from 'fego-rn'

/**
 * icon与name组合通用组件，
 */
export default class iconWithName extends React.Component {
  static defaultProps = {
    iconName: require('../Assert/account.png'),
    name: 'name'
  };
  static PropTypes = {
    iconName: PropTypes.source,
    name: PropTypes.string,
  }

  constructor(props) {
    super(props)

  }

  _onPress = () => {

  }

  render() {
    return (
      <TouchableHighlight
        underlayColor='transparent'
        style={baseStyle.container}
        onPress={this._onPress}>
        <View style={baseStyle.itemBgView}>
          <Image source={this.props.iconName} style={{ width: 25, height: 25 }} />
          <Text style={baseStyle.name}>{this.props.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

var baseStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemBgView: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    color: 'black',
    fontSize: 14,
    marginTop: 15,
  },

})
