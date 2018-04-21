import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Clipboard } from 'react-native';

export default class SaveText extends Component {
  state = { text: '' };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    Clipboard.getString().then(text => {
      if (text.length > 10) {
        this.setState({ text: text });
        // Clear clipboard
        Clipboard.setString('');
      }
    })
  }

  static navigatorButtons = {
    rightButtons: [
      {
        id: 'cancel', buttonColor: 'white',
        icon: require('../img/Cancel.png')
      }
    ],
    leftButtons: [
      {
        id: 'confirm', buttonColor: 'white',
        icon: require('../img/Confirm.png')
      }
    ]
  };

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'cancel') {
        this.props.navigator.dismissModal();
      } else if (event.id == 'confirm') {
        const { text } = this.state;
        if (text != '') {
          let now = new Date();
          let timeNow = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
          this.props.addData({time: timeNow, text: text});
        }
        this.props.navigator.dismissModal();
      }
    }
  }

  render() {
    const { textStyle } = styles;
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <TextInput value={this.state.text} style={textStyle} multiline autoCapitalize='none' autoCorrect={false}
          onChangeText={(text) => this.setState({text: text})}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 16,
    fontWeight: '300'
  }
})