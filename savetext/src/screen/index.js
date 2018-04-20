import { Navigation } from 'react-native-navigation';

// All screens
import SaveText from './SaveText';

/**
 * Register all screens
 */
export function registerScreens() {
  Navigation.registerComponent('text.SaveText', () => SaveText);
}