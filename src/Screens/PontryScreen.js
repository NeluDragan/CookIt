import React from 'react';
import {View} from 'react-native';
import OnboardingAddRecipe from '../Components/Organism/OnBoardingAddRecipe/OnboardingAddRecipe';

const PontryScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <OnboardingAddRecipe />
    </View>
  );
};

export default PontryScreen;
