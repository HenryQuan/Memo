import { Navigation } from 'react-native-navigation';

import { registerScreens } from '../screen';

registerScreens();

Navigation.startSingleScreenApp({
  screen: {
    screen: 'text.SaveText',
    title: 'Save Text',
  },
  animationType: 'fade'
});