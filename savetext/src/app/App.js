import { Navigation } from 'react-native-navigation';

import { registerScreens } from '../screen';
import { DEEPPRUPLE } from 'react-native-material-color';
import { Platform } from 'react-native';

registerScreens();

Navigation.startSingleScreenApp({
  screen: {
    screen: 'text.SaveText',
    title: 'Teksute',
  },
  appStyle: Platform.OS == 'android' ? {
    navBarTextColor: 'white',
    navBarBackgroundColor: DEEPPRUPLE[500],
    statusBarColor: DEEPPRUPLE[700]
  } : {},
});