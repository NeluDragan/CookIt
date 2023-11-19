import React from 'react';
import {View, Text} from 'react-native';

const HealthScoreContent = ({recipe}) => (
  <View>
    <Text>Health Score: {recipe.healthScore}</Text>
  </View>
);

export default HealthScoreContent;
