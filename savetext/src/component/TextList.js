import React, { Component } from 'react';
import { View, FlatList, Button } from 'react-native';
import TextCell from './TextCell';

class TextList extends Component {
  constructor(props) {
    super();
    this.state = { data: props.data }
    console.log(props.data);
  }

  itemKey = (item, index) => item.text + index;
  render() {
    const { data } = this.props;
    return (
      <FlatList data={data} keyExtractor={this.itemKey} removeClippedSubviews={false}
        renderItem={({item}) => <TextCell data={item}/>}/>
    )
  }
}

export { TextList };