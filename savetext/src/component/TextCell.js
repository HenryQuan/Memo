import React, { Component } from 'react';
import { View, Vibration, Text, Clipboard } from 'react-native';
import { EasyTouchable } from './common/EasyTouchable';

export default class TextCell extends Component {
  state = { showBtn: false }

  render() {
    const { showBtn } = this.state;
    const { time, text } = this.props.data;
    return (
      <EasyTouchable onLongPress={this.showButton} onPress={this.copyText}>
        <View>
          <Text>{time}</Text>
          <Text>{text}</Text>
          { showBtn ? <Text>True</Text> : null}
        </View>
      </EasyTouchable>
    )
  }

  /**
   * Show hidden buttons
   */
  showButton = () => {
    Vibration.vibrate(300);
    this.setState({showBtn: true});
  }

  /**
   * Open link if there is any
   */
  copyText = () => {
    // Backup
    Clipboard.getString().then(text => {
      global.clipboard = text;
      console.log(global.clipboard);
    });
    Clipboard.setString(this.props.data.text);
  }
}