import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { DataManager } from '../core/DataManager';
import { TextList } from '../component';

export default class SaveText extends Component {
  state = { data: [{time: '1', text: 'hello'}, {time: '2', text: 'world'}] };

  async componentWillMount() {
    await DataManager.SetupData();
    // this.updateData(global.saved);
    console.log(this.state.data);
  }

  render() {
    const { data } = this.state;
    return (
      <View style={{flex: 1}}>
        <TextList data={data}/>
        <Button title='ADD'/>
      </View>
    )
  }

  updateData = (saved) => {
    this.setState({ data: saved })
  }
}