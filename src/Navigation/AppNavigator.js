import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RecipeInfo from '../Components/Organism/RecipeInfo';
import HomeScreen from '../Screens/HomeScreen';
import Tabs from './Tabs';

const AppNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Tabs">
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="RecipeInfo" component={RecipeInfo} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
