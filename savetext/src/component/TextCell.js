import React, { Component } from 'react';
import { View, Vibration, Linking, Text } from 'react-native';
import { EasyTouchable } from './common/EasyTouchable';

export default class TextCell extends Component {
  state = { showBtn: false }

  render() {
    const { showBtn } = this.state;
    const { time, text } = this.props.data;
    return (
      <EasyTouchable onLongPress={this.showButton}>
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
  openLink = () => {
    const { text } = this.props;    
    let regex = new RegExp('(http.+?.com|www..+?.com)');
    let matches = text.match(regex);
    if (matches.count == 1) {
      Linking.openURL(matches[0]);
    }
  }
}