import { Navigation } from 'react-native-navigation';

// All screens
import SaveText from './SaveText';
import AddText from './AddText';

/**
 * Register all screens
 */
export function registerScreens() {
  Navigation.registerComponent('text.SaveText', () => SaveText);
  Navigation.registerComponent('text.AddText', () => AddText);
}