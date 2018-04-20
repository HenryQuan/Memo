import { Navigation } from 'react-native-navigation';

import { registerScreens } from '../screen';

registerScreens();

Navigation.startSingleScreenApp({
  screen: {
    screen: 'text.SaveText',
    title: 'Simo',
  },
  animationType: 'fade'
});