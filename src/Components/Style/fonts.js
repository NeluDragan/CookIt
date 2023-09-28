import {AppRegistry} from 'react-native';
import {registerRootComponent} from 'expo';
import App from './App';
import {loadAsync} from 'expo-font';

// Load the Futura font
const loadFonts = async () => {
  await loadAsync({
    Futura: require('./futura.ttf'),
    'Futura-Bold': require('./futura-bold.ttf'),
    // Add more font weights as needed
  });
};

// Load fonts before rendering the app
loadFonts().then(() => {
  AppRegistry.registerComponent('MyApp', () => App);
  registerRootComponent(App);
});
