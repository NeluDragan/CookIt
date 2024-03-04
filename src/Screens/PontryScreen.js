import React from 'react';
import {View, Text} from 'react-native';
import AddRecipeScreen from '../Components/Organism/AddRecipe';
import OnboardingAddRecipe from '../Components/Organism/OnboardingAddRecipe';

const PontryScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <OnboardingAddRecipe />
      {/* <AddRecipeScreen /> */}
    </View>
  );
};

export default PontryScreen;
