import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, Platform, SafeAreaView, Linking } from 'react-native';
import { DEEPPRUPLE, GREY } from 'react-native-material-color';
import { VERSION, Developer, Github, Data } from '../constant/value';
import CheckBox from 'react-native-check-box'
import store from 'react-native-simple-store';
import { SettingCell } from '../component';

export default class Setting extends Component {
  state = { img: Platform.OS == 'android' ? require('../img/IOS.png') : require('../img/Android.png'),
            ads: global.ads }

  render() {
    const { mainViewStyle, logoViewStyle, versionStyle, titleStyle, checkBoxStyle, leftTextStyle } = styles;
    const { img, ads } = this.state;
    return (
      <ScrollView style={mainViewStyle}>
        <SafeAreaView>
          <View style={logoViewStyle}>
            <Image source={img} style={{height: 128, width: 128}}/>
            <Text style={titleStyle}>Teksute</Text>
          </View>        
          <SettingCell title='Source code' onPress={() => Linking.openURL(Github)}/>
          <SettingCell title='Email feedback' onPress={() => Linking.openURL(Developer)}/>
          <CheckBox style={checkBoxStyle} leftTextStyle={leftTextStyle} onClick={this.showAds}
            isChecked={ads} leftText='Show ad on launch'/>
          <Text style={versionStyle}>{VERSION}</Text>   
        </SafeAreaView>
      </ScrollView>
    )
  }

  /**
   * Show ads on launch
   */
  showAds = () => {
    const { ads } = this.state;
    global.ads = !ads;
    store.save(Data.Ads, !ads);
    this.setState({ads: !ads});
  }
}

const styles = StyleSheet.create({
  mainViewStyle: {
    flex: 1, backgroundColor: 'white'
  },
  logoViewStyle: {
    justifyContent: 'center',
    alignItems: 'center', paddingTop: 16
  },
  versionStyle: {
    marginLeft: 16,
    marginTop: 4,
    fontSize: 12,
    color: GREY[400]
  },
  titleStyle: {
    fontWeight: '300',
    fontSize: 24,
    marginBottom: 32,
    marginTop: 4
  },
  checkBoxStyle: {
    flex: 1, padding: 12
  },
  leftTextStyle: {
    paddingLeft: 4,
    color: GREY[900],
    fontWeight: 'bold',
  }
})