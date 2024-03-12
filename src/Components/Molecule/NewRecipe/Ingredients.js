import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';

const IngredientSelector = ({availableIngredients, onSelectIngredients}) => {
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [quantity, setQuantity] = useState('');

  const handleSelectIngredient = () => {
    if (selectedIngredient && quantity) {
      const selectedData = {
        id: selectedIngredient.key,
        name: selectedIngredient.value,
        quantity: parseFloat(quantity),
      };
      onSelectIngredients(selectedData);

      setSelectedIngredient(null);
      setQuantity('');
    }
  };

  const ingredientNames = availableIngredients.map(
    ingredient => ingredient.name,
  );

  return (
    <View>
      <Text>Ingredients:</Text>
      <SelectList
        data={ingredientNames}
        setSelected={item => setSelectedIngredient(item)}
        label="Ingredients"
      />

      <Text>Quantity:</Text>
      <TextInput
        placeholder="Enter quantity"
        keyboardType="numeric"
        value={quantity}
        onChangeText={text => setQuantity(text)}
      />

      <Button title="Add Ingredient" onPress={handleSelectIngredient} />
    </View>
  );
};

export default IngredientSelector;
