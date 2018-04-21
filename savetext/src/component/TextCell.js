import React, { Component } from 'react';
import { View, Vibration, Text, Clipboard, StyleSheet, Linking, Alert } from 'react-native';
import HyperlinkedText from 'react-native-hyperlinked-text';
import { EasyTouchable } from './common/EasyTouchable';
import { GREY, DEEPPRUPLE, GREEN, PURPLE, BLUE } from 'react-native-material-color';

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
          <HyperlinkedText style={textStyle} onLinkPress={(url, text) => Linking.openURL(url)} linkDefs={[
              {
                regex: /([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)/mgi,
                style: {color: GREEN[700], fontSize: 18},
                onPress: (mail) => Linking.openURL('mailto:' + mail)
              },
              {
                regex: /\d{5,}/mgi,
                style: {color: BLUE[700], fontSize: 18},
                onPress: (phone) => Linking.openURL('tel:' + phone)
              },
              {
                regex: /(www|http:|https:)+[^\s]+[\w]/g,
                style: {color: DEEPPRUPLE[500], fontSize: 18},
                onPress: (link) => {
                  var webLink = link;
                  if (!link.includes('http')) webLink = 'https://' + webLink;
                  Linking.openURL(webLink)   
                }             
              }]}>
            {text}
            </HyperlinkedText>
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
    Clipboard.getString().then(text => {
      Clipboard.setString(this.props.data.text);
      Alert.alert(
        'Text has been copied',
        'By tapping undo, text copied previously will be back',
        [
          {text: 'UNDO', onPress: () => Clipboard.setString(text), style: 'cancel'},
          {text: 'OK', onPress: () => console.log('Copy done')},
        ]
      )
    })
  }
}

const styles = StyleSheet.create({
  timeStyle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: GREY[400],
    paddingBottom: 6
  },
  textStyle: {
    fontWeight: '300',
    color: GREY[900]
  },
  viewStyle: {
    marginBottom: 4,
    padding: 8
  }
})