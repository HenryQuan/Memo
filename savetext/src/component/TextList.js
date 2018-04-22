import React, { PureComponent } from 'react';
import { View, FlatList, Button } from 'react-native';
import TextCell from './TextCell';

class TextList extends PureComponent {
  constructor(props) {
    super();
    this.state = { data: props.data };
  }

  componentWillReceiveProps() {
    const { data } = this.props;
    this.setState({data: data});
  }

  itemKey = (item, index) => item.text + index;
  render() {
    const { data } = this.state;
    return (
      <FlatList data={data} keyExtractor={this.itemKey} extraData={this.state} showsVerticalScrollIndicator={false}
        renderItem={({item}) => <TextCell data={item} update={this.props.update}/>}/>
    )
  }
}

export { TextList };