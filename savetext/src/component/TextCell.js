import React, { Component } from 'react';
import { View, Vibration, Text, Clipboard, StyleSheet } from 'react-native';
import Snackbar from 'react-native-snackbar';
import { EasyTouchable } from './common/EasyTouchable';
import { GREY } from 'react-native-material-color';

export default class TextCell extends Component {
  state = { showBtn: false }

  render() {
    const { showBtn } = this.state;
    const { time, text } = this.props.data;
    const { textStyle, timeStyle, viewStyle } = styles;
    return (
      <EasyTouchable onLongPress={this.showButton} onPress={this.copyText}>
        <View style={viewStyle}>
          <Text style={timeStyle}>{time}</Text>
          <Text style={textStyle}>{text}</Text>
          { showBtn ? <Text>Coming soon...</Text> : null}
        </View>
      </EasyTouchable>
    )
  }

  /**
   * Show hidden buttons
   */
  showButton = () => {
    Vibration.vibrate(50);
    this.setState({showBtn: true});
  }

  /**
   * Open link if there is any
   */
  copyText = () => {
    Clipboard.setString(this.props.data.text);
    // Clipboard.getString().then(text => {
    //   // Backup      
    //   global.clipboard = text;
      
    //   // Show snackbar
    //   Snackbar.show({
    //     title: 'Text has been copied',
    //     duration: Snackbar.LENGTH_LONG,
    //     action: {
    //       title: 'UNDO',
    //       color: 'orange',
    //       onPress: () => { Clipboard.setString(global.clipboard) }
    //     }
    //   });
    // });
  }
}

const styles = StyleSheet.create({
  timeStyle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: GREY[400],
    paddingBottom: 6
  },
  textStyle: {
    fontSize: 16,
    fontWeight: '300',
    color: GREY[900]
  },
  viewStyle: {
    marginBottom: 4,
    padding: 8
  }
})