import {AppRegistry} from 'react-native';
import {registerRootComponent} from 'expo';
import App from '../../App';
import {loadAsync} from 'expo-font';

const loadFonts = async () => {
  await loadAsync({
    Futura: require('./futur.ttf'),
    'Futura-Bold': require('./Futura Bold font.ttf'),
  });
};

loadFonts().then(() => {
  AppRegistry.registerComponent('MyApp', () => App);
  registerRootComponent(App);
});
