import React, { Component } from 'react';
import { View, TextInput } from 'react-native';

export default class SaveText extends Component {
  state = { text: '' }

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  static navigatorButtons = {
    rightButtons: [
      {
        id: 'cancel',
        icon: require('../img/Cancel.png')
      }
    ],
    leftButtons: [
      {
        id: 'confirm',
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
          this.props.addData({time: '333', text: text});
        }
        this.props.navigator.dismissModal();
      }
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <TextInput multiline autoFocus autoCapitalize='none' autoCorrect={false}
          onChangeText={(text) => this.setState({text: text})}/>
      </View>
    )
  }
}