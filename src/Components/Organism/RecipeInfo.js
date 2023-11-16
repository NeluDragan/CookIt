import React from 'react';
import {View, Text} from 'react-native';

const RecipeInfo = ({route}) => {
  const {recipe} = route.params;

  return (
    <View>
      <Text>Name: {recipe.name}</Text>
      <Text>Ingredients: {recipe.ingredients.join(', ')}</Text>
      <Text>Preparation Time: {recipe.preparationTime} minutes</Text>
      <Text>Instructions:</Text>
      <Text>{recipe.instructions.join('\n')}</Text>
    </View>
  );
};

export default RecipeInfo;
