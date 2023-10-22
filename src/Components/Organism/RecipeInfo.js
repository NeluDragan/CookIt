import React from 'react';
import {View, Text} from 'react-native';

const RecipeInfo = ({route}) => {
  const {recipe} = route.params;

  // Utilizați datele rețetei pentru a afișa informațiile în această componentă

  return (
    <View>
      <Text>Name: {recipe.name}</Text>
      <Text>Ingredients: {recipe.ingredients.join(', ')}</Text>
      <Text>Preparation Time: {recipe.preparationTime} minutes</Text>
      <Text>Instructions:</Text>
      <Text>{recipe.instructions.join('\n')}</Text>
      {/* Afișați și alte informații despre rețetă aici */}
    </View>
  );
};

export default RecipeInfo;
