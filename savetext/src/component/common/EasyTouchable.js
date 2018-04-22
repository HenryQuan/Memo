import React, { Component } from 'react';
import { View, TouchableNativeFeedback, TouchableOpacity, Platform } from 'react-native';

let Touchable = Platform.OS == 'ios' ? TouchableOpacity : TouchableNativeFeedback;

class EasyTouchable extends Component {
  render() {
    const { children, ...props } = this.props;
    return (
      <Touchable {...props}>
        <View>
          { children }
        </View>
      </Touchable>
    )
  }
}

export { EasyTouchable };