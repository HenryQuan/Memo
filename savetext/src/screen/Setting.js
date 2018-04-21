import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, Platform, SafeAreaView, Linking } from 'react-native';
import { DEEPPRUPLE, GREY } from 'react-native-material-color';
import { VERSION, Developer, Github } from '../constant/value';
import { SettingCell } from '../component';

export default class Setting extends Component {
  state = { img: Platform.OS == 'android' ? require('../img/IOS.png') : require('../img/Android.png') }

  render() {
    const { mainViewStyle, logoViewStyle, versionStyle, titleStyle } = styles;
    const { img } = this.state;
    return (
      <ScrollView style={mainViewStyle}>
        <SafeAreaView>
          <View style={logoViewStyle}>
            <Image source={img} style={{height: 128, width: 128}}/>
            <Text style={titleStyle}>Teksute</Text>
          </View>
          <SettingCell title='Write a review'/>          
          <SettingCell title='Source code' onPress={() => Linking.openURL(Github)}/>
          <SettingCell title='Email feedback' onPress={() => Linking.openURL(Developer)}/>
          <SettingCell title='Support with ad'/>
          <Text style={versionStyle}>{VERSION}</Text>   
        </SafeAreaView>
      </ScrollView>
    )
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
  }
})