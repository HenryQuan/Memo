import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DEEPPRUPLE } from 'react-native-material-color';
import { EasyTouchable } from '..';

class NewTextBtn extends Component {
  render() {
    const { title, ...props} = this.props;
    const { viewStyle, textStyle } = styles;
    return (
      <EasyTouchable {...props}>
        <View style={viewStyle}>
          <Text style={textStyle}>{title}</Text>
        </View>
      </EasyTouchable>
    )
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    padding: 8,
    backgroundColor: DEEPPRUPLE[500],
    height: 44,
    justifyContent: 'center'
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white'
  }
})

export { NewTextBtn };