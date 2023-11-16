import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../Screens/SignInScreen';
import SignUpScreen from '../Screens/SignUpScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={SignInScreen} />
      <Stack.Screen name="Register" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
