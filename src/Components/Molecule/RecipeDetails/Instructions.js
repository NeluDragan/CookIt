import React from 'react';
import {View, Text} from 'react-native';

const InstructionsContent = ({recipe}) => (
  <View>
    <Text>Instructions:</Text>
    <Text>{recipe.instructions.join('\n')}</Text>
  </View>
);

export default InstructionsContent;
