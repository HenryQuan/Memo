import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { EasyTouchable } from '..';
import { DEEPPRUPLE } from 'react-native-material-color';

class RoundBtn extends Component {
  render() {
    const { title, onPress } = this.props;
    const { touchableStyle, viewStyle, textStyle } = styles;
    return (
      <EasyTouchable onPress={onPress} style={touchableStyle}>
        <View style={viewStyle}>
          <Text style={textStyle}>{title}</Text>
        </View>
      </EasyTouchable>
    )
  }
}

const styles = StyleSheet.create({
  touchableStyle: {
    borderRadius: 100,
    padding: 4
  },
  viewStyle: {
    height: 26, width: 78,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: DEEPPRUPLE[300]
  },
  textStyle: {
    color: 'white',
    fontSize: 14, fontWeight: '300'
  }
})

export { RoundBtn };