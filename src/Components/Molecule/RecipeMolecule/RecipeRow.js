import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

const RecipeRow = ({navigation, recipe}) => {
  const handleRecipeInfoPress = () => {
    if (navigation) {
      navigation.navigate('RecipeInfo');
    } else {
      console.log('Navigation is not available');
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleRecipeInfoPress}>
      <Image source={recipe.image} style={styles.recipeImage} />
      <View style={styles.textContainer}>
        <View style={styles.recipeNameOverlay}>
          <Text style={styles.recipeName}>{recipe.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    height: 170,
    maxHeight: 170,
    borderBottomColor: '#ccc',
  },
  recipeImage: {
    width: 300,
    height: 160,
    borderRadius: 5,
    marginRight: 10,
  },
  recipeNameOverlay: {
    position: 'absolute',
    bottom: 0,
    left: -300,
    padding: 5,
    borderRadius: 5,
  },
  recipeName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default RecipeRow;
