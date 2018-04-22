import React, { Component } from 'react';
import { SafeAreaView, Button, Platform } from 'react-native';
import { DataManager } from '../core/DataManager';
import { TextList, NewTextBtn } from '../component';
import store from 'react-native-simple-store';
import { Data } from '../constant/value';

export default class SaveText extends Component {
  constructor(props) {
    super(props);
    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.state = {data: []};
  }

  static navigatorButtons = {
    rightButtons: [
      {
        id: 'setting', buttonColor: 'white', disableIconTint: true,
        icon: require('../img/Setting.png')
      }
    ],
  };

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'setting') {
        this.props.navigator.push({
          screen: 'text.Setting',
          title: 'Settings',
          navigatorStyle: Platform.OS == 'android' ? {
            navBarButtonColor: 'white' 
          } : {}
        })
      }
    }
  }

  async componentWillMount() {
    await DataManager.SetupData();
    this.setState({data: global.saved});
    this.forceUpdate();
  }

  render() {
    const { data } = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <TextList data={data} update={(data) => this.setState({data: data}, () => this.forceUpdate())}/>
        <NewTextBtn title='Add a new text...' onPress={this.addNewText}/>              
      </SafeAreaView>
    )
  }

  /**
   * Add new text into app
   */
  addNewText = () => {
    this.props.navigator.showModal({
      screen: 'text.AddText',
      title: 'Add Text',
      animationType: 'slide-up',
      passProps: {addData: (data) => {
        global.saved.push(data);
        this.setState({data: global.saved});
        // Save current text
        store.save(Data.Saved, global.saved);
      }}
    })
  }
}