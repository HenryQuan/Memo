import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { DataManager } from '../core/DataManager';
import { TextList } from '../component';

export default class SaveText extends Component {
  state = { data: [] };

  async componentWillMount() {
    await DataManager.SetupData();
    this.setState({data: []})
  }

  render() {
    const { data } = this.state;
    return (
      <View style={{flex: 1}}>
        <Button title='ADD' onPress={this.addNewText}/>      
        <TextList data={data}/>
      </View>
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
        console.log(global.saved);
        this.setState({data: global.saved});
      }}
    })
  }
}