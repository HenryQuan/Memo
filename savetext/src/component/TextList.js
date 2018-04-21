import React, { Component } from 'react';
import { View, FlatList, Button } from 'react-native';
import TextCell from './TextCell';

class TextList extends Component {
  constructor(props) {
    super();
    this.state = { data: props.data };
  }

  componentWillReceiveProps() {
    const { data } = this.props;
    console.log(data);
    this.setState({data: data});
  }

  itemKey = (item, index) => item.text + index;
  render() {
    const { data } = this.state;
    return (
      <FlatList data={data} keyExtractor={this.itemKey} extraData={this.state}
        renderItem={({item}) => <TextCell data={item} update={this.props.update}/>}/>
    )
  }
}

export { TextList };