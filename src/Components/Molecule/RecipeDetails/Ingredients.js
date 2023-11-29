// IngredientsContent.js
import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const IngredientsContent = ({ingredientsDetails, recipe}) => {
  const [servings, setServings] = useState(1);

  const handleIncreaseServings = () => {
    setServings(servings + 1);
  };

  const handleDecreaseServings = () => {
    if (servings > 1) {
      setServings(servings - 1);
    }
  };

  return (
    <View>
      <View style={styles.servingsContainer}>
        <View>
          <Text style={styles.servingsText}>{servings} Serving(s)</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={handleDecreaseServings}>
            <Text style={styles.servingsButton}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleIncreaseServings}>
            <Text style={styles.servingsButton}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      {ingredientsDetails.map((ingredient, index) => (
        <View style={styles.ingredientContainer} key={ingredient._id || index}>
          <Image source={{uri: ingredient.photo}} style={styles.image} />
          <Text style={styles.ingredientText}>
            {recipe.ingredients.find(item => item.id === ingredient._id)
              .quantity * servings}
            {recipe.ingredients.find(item => item.id === ingredient._id)
              .quantity > 1 &&
              ingredient.unit === 'g' &&
              'g'}
            {recipe.ingredients.find(item => item.id === ingredient._id)
              .quantity > 1 &&
              ingredient.unit === 'ml' &&
              'ml'}{' '}
            {ingredient.name}
            {recipe.ingredients.find(item => item.id === ingredient._id)
              .quantity > 1 &&
              ingredient.unit === 'piece' &&
              's'}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  ingredientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 7,
    marginHorizontal: 15,
  },
  image: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  ingredientText: {
    fontSize: 14,
  },
  servingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'space-between',
    marginHorizontal: 13,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  servingsButton: {
    fontSize: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  servingsText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default IngredientsContent;
