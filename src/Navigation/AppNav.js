import React, {useContext} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {AuthContext} from '../context/AuthContext';

const AppNav = () => {
  const {isLoading, userToken} = useContext(AuthContext);

  return (
    <NavigationContainer>
      {userToken !== null ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNav;
