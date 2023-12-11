import React from 'react';
import {View, Text} from 'react-native';
import AddRecipeScreen from '../Components/Organism/AddRecipe';

const PontryScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <AddRecipeScreen />
    </View>
  );
};

export default PontryScreen;
