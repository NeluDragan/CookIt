import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import Tabs from './Tabs';
import Account from '../Components/Molecule/Profile/Account';
import RecipeInfo from '../Components/Organism/RecipeInfo';
import Notifications from '../Components/Molecule/Profile/Notifications';
import Preferences from '../Components/Molecule/Profile/Preferences';
import About from '../Components/Molecule/Profile/About';
import Feedback from '../Components/Molecule/Profile/Feedback';
import SeeAllType from '../Components/Organism/SeeAllType';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tab"
        component={Tabs}
        options={{headerShown: false}}
      />

      <Stack.Group>
        <Stack.Screen
          name="Account"
          component={Account}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Preferences"
          component={Preferences}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Feedback"
          component={Feedback}
          options={{headerShown: false}}
        />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          name="RecipeInfo"
          component={RecipeInfo}
          options={{headerShown: false}}
        />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          name="SeeAllType"
          component={SeeAllType}
          options={{headerShown: false}}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default StackNavigation;
