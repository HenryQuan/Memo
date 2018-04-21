import React, { Component } from 'react';
import { SafeAreaView, Button } from 'react-native';
import { DataManager } from '../core/DataManager';
import { TextList, NewTextBtn } from '../component';
import store from 'react-native-simple-store';
import { Data } from '../constant/value';

export default class SaveText extends Component {
  constructor() {
    super();
    this.state = { data: [] };
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
        <TextList data={data} update={this.updateList}/>
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

  /**
   * Update list item
   */
  updateList = () => {

  }
}