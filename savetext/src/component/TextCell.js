import React, { Component } from 'react';
import { View, Vibration, Text, Clipboard, StyleSheet, Linking, Alert, Button } from 'react-native';
import HyperlinkedText from 'react-native-hyperlinked-text';
import { EasyTouchable } from './common/EasyTouchable';
import store from 'react-native-simple-store';
import { GREY, DEEPPRUPLE, GREEN, PURPLE, BLUE, BLUEGREY } from 'react-native-material-color';
import { Data } from '../constant/value';
import { RoundBtn } from '.';

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
                style: {color: GREEN[700], fontSize: 18, padding: 2},
                onPress: (mail) => Linking.openURL('mailto:' + mail)
              },
              {
                regex: /\d{5,}/mgi,
                style: {color: BLUE[700], fontSize: 18, padding: 2},
                onPress: (phone) => Linking.openURL('tel:' + phone)
              },
              {
                regex: /(www|http:|https:)+[^\s]+[\w]/g,
                style: {color: DEEPPRUPLE[500], fontSize: 18, padding: 2},
                onPress: (link) => {
                  var webLink = link;
                  if (!link.includes('http')) webLink = 'https://' + webLink;
                  Linking.openURL(webLink)   
                }             
              }]}>
            {text}
            </HyperlinkedText>
          { showBtn ? this.renderExtraBtn() : null}
          <Text style={textStyle}>________</Text>
        </View>
      </EasyTouchable>
    )
  }

  /**
   * When long hold, render more buttons
   */
  renderExtraBtn(){
    const { extraViewStyle } = styles;
    return (
      <View style={extraViewStyle}>
        <RoundBtn title='Top' onPress={this.topEntry}/>
        <RoundBtn title='Delete' onPress={this.removeEntry}/>
      </View>
    )
  }

  /**
   * Top this entry to the first
   */
  topEntry = () => {
    const { data, update } = this.props;
    // Remove curr data
    var currData = global.saved;
    currData = currData.filter(text => text.time != this.props.data.time)
    // Update data
    this.updateData([data].concat(currData));
  }

  /**
   * Remove current entry
   */
  removeEntry = () => {
    this.updateData(global.saved.filter(text => text.time != this.props.data.time));
  }

  updateData(data) {
    global.saved = data;
    store.save(Data.Saved, global.saved);
    this.props.update(global.saved);
    this.setState({showBtn: false});
    global.extra = false;
  }

  /**
   * Show hidden buttons
   */
  showButton = () => {
    Vibration.vibrate(50);
    const { showBtn } = this.state;
    if (global.extra && showBtn) {
      this.setState({showBtn: false});
      global.extra = false;
    } else if (!global.extra && !showBtn){
      this.setState({showBtn: true});
      global.extra = true;
    }
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
    paddingBottom: 6,
    color: GREY[500]
  },
  textStyle: {
    fontWeight: '300',
    fontSize: 15,
    color: GREY[900],
  },
  viewStyle: {
    marginBottom: 4,
    padding: 8
  },
  extraViewStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: 8,
    marginTop: 8
  }
})