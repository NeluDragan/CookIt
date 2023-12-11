import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {MultipleSelectList} from 'react-native-dropdown-select-list';
import InputAtom from '../Atoms/InputAtom';
import SelectDropdown from 'react-native-select-dropdown';
import IngredientSelection from '../Molecule/NewRecipe/Ingredients';

const AddRecipeScreen = () => {
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [preparationTime, setPreparationTime] = useState('');
  const [instructions, setInstructions] = useState([]);
  const [type, setType] = useState('');
  const [image, setImage] = useState('');
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [newInstruction, setNewInstruction] = useState('');
  const types = [
    'Salad',
    'Breakfast',
    'Lunch',
    'Dinner',
    'Dessert',
    'Drinks',
    'Altele',
  ];

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get('http://localhost:3001/ingredient');
        setAvailableIngredients(response.data);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };

    fetchIngredients();
  }, []);

  const addInstruction = () => {
    setInstructions([...instructions, newInstruction]);
    setNewInstruction('');
  };

  const renderInstructionItem = ({item, index}) => (
    <View style={styles.instructionItem}>
      <Text>{`${index + 1}. ${item}`}</Text>
    </View>
  );

  const handleSelectIngredients = selectedData => {
    // Do something with the selected data (e.g., add to the list of selected ingredients)
    setSelectedIngredients([...selectedIngredients, selectedData]);
  };

  const addRecipe = async () => {
    console.log('Adding recipe...');
    console.log('recipeName', recipeName);
    console.log('selectedIngredients', selectedIngredients);
    console.log('preparationTime', preparationTime);
    console.log('instructions', instructions);
    console.log('type', type);
    console.log('image', image);

    try {
      const response = await axios.post('http://localhost:3001/addRecipe', {
        name: recipeName,
        ingredients: selectedIngredients,
        preparationTime: preparationTime,
        instructions: instructions,
        type: type,
        image: image,
      });

      console.log('Recipe added successfully!', response.data);
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Recipe Name:</Text>
      <InputAtom
        placeholder={'Recipe Name'}
        setValue={setRecipeName}
        onChangeText={text => recipeName(text)}
      />

      <Text style={styles.label}>Ingredients:</Text>
      <View style={styles.ingredients}>
        <IngredientSelection
          availableIngredients={availableIngredients}
          setSelectedIngredients={handleSelectIngredients}
        />
      </View>

      <Text style={styles.label}>Preparation Time (minutes):</Text>

      <InputAtom
        placeholder={'Preparation Time (minutes)'}
        setValue={setPreparationTime}
        onChangeText={text => preparationTime(text)}
        keyboardType={'number-pad'}
      />

      <Text style={styles.label}>Instructions:</Text>
      <View style={styles.instructionsContainer}>
        <FlatList
          data={instructions}
          renderItem={renderInstructionItem}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.newInstructionContainer}>
          <InputAtom
            placeholder={'Add new instruction'}
            setValue={setNewInstruction}
            onChangeText={text => newInstruction(text)}
          />
          <TouchableOpacity style={styles.addButton} onPress={addInstruction}>
            <Text>Add</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.label}>Type:</Text>
      <SelectDropdown
        data={types}
        onSelect={selectedItem => {
          setType(selectedItem);
        }}
        buttonTextAfterSelection={selectedItem => {
          return selectedItem;
        }}
        rowTextForSelection={item => {
          return item;
        }}
      />

      <Text style={styles.label}>Image URL:</Text>

      <InputAtom
        placeholder={'Image URL'}
        setValue={setImage}
        onChangeText={text => image(text)}
      />

      <Button title="Add Recipe" onPress={addRecipe} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '85%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  ingredients: {},
  instructionsContainer: {
    flex: 1,
  },
  instructionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  newInstructionContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  newInstructionInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});

export default AddRecipeScreen;
