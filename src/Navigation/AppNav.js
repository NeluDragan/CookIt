import React, {useContext} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import AuthStack from './AuthStack';
import Tabs from './Tabs';
import AppNavigator from './AppNavigator';
import {AuthContext} from '../context/AuthContext';
import StackNavigation from './StackNavigation';

const AppNav = () => {
  const {isLoading, userToken} = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userToken !== null ? <StackNavigation /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNav;
