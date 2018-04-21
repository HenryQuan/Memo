/*
  DrawerCell.js
  Created on 19 Feb 2018 
  by Yiheng Quan
  
  The template of all drawer cells 
*/

import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { SmartTouchable, EasyTouchable } from '../../component';
import { GREY } from 'react-native-material-color';

class SettingCell extends Component {
  render() {
    const { textStyle, textViewStyle } = styles;
    const { title, onPress } = this.props;
    return (
      <EasyTouchable onPress={onPress}>
        <View style={textViewStyle}>
          <Text style={textStyle}>{title}</Text>
        </View>
      </EasyTouchable>
    )
  }
}

const styles = StyleSheet.create({
  textStyle: {
    paddingLeft: 12,
    color: GREY[900],
    fontWeight: 'bold',
  },
  textViewStyle: {
    margin: 4,
    height: 44,
    justifyContent: 'center',
  }
})

export { SettingCell };