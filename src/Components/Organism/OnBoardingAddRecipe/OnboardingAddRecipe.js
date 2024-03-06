/* eslint-disable react/no-unstable-nested-components */
import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  useWindowDimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  Button,
  ScrollView,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import {SelectList} from 'react-native-dropdown-select-list';

import InputAtom from '../../Atoms/InputAtom';
import {data} from '../../../data/recipeData';
import {useInputValues} from './inputValues';
import ButtonAtom from '../../Atoms/ButtonAtom';

const OnboardingAddRecipe = () => {
  let defaultTemp = {editingIndex: -1, text: ''};
  const {width: SCREEN_WIDTH} = useWindowDimensions();
  const x = useSharedValue(0);
  const flatListRef = useRef(null);
  const {inputValues, setInputValues} = useInputValues(defaultTemp);
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = React.useState([]);

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x;
    },
  });

  useEffect(() => {
    fetchIngredients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchIngredients = async () => {
    try {
      const response = await fetch('http://localhost:3001/getIngredientsName');
      const data = await response.json();
      setIngredients(data.map(ingredient => ingredient.name));
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    }
  };

  const handleInputChange = (value, key) => {
    setInputValues(prevValues => ({...prevValues, [key]: value}));
  };

  const handleNext = index => {
    const currentItem = data[index];
    handleInputChange(inputValues[currentItem.key], currentItem.key);

    if (index < data.length - 1) {
      flatListRef.current.scrollToIndex({index: index + 1, animated: true});
    } else {
      console.log('Final state:', inputValues);
    }
  };

  const handleAddInput = key => {
    if (key === 'ingredients') {
      setSelectedIngredients([...selectedIngredients, '']);
    } else if (key === 'instructions') {
      setInputValues(prevValues => ({
        ...prevValues,
        instructions: [...prevValues.instructions, ''],
      }));
    }
  };

  const handleIngredientChange = (value, ingredientIndex) => {
    const updatedIngredients = [...selectedIngredients];
    updatedIngredients[ingredientIndex] = value;
    setSelectedIngredients(updatedIngredients);
    handleInputChange(updatedIngredients, 'ingredients');
  };

  const handleInstructionChange = (text, instructionIndex) => {
    const updatedInstructions = [...inputValues.instructions];
    updatedInstructions[instructionIndex] = text;
    setInputValues(prevValues => ({
      ...prevValues,
      instructions: updatedInstructions,
    }));
  };

  const RenderItem = ({item, index}) => {
    return (
      <View style={[styles.itemContainer, {width: SCREEN_WIDTH}]}>
        <Image
          source={item.image}
          style={{width: SCREEN_WIDTH * 0.5, height: SCREEN_WIDTH * 0.5}}
        />
        <View>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemText}>{item.text}</Text>
          {item.key === 'title' && (
            <InputAtom
              setValue={text => handleInputChange(text, item.key)}
              placeholder={`Enter the ${item.title.toLowerCase()} of your recipe`}
              value={inputValues[item.key]}
            />
          )}

          {item.key === 'ingredients' && (
            <ScrollView style={styles.scrollContainer}>
              <View>
                {selectedIngredients.map((ingredient, ingredientIndex) => (
                  <View key={ingredientIndex} style={styles.selector}>
                    <SelectList
                      save="value"
                      selectedValue={ingredient}
                      data={ingredients}
                      setSelected={val =>
                        handleIngredientChange(val, ingredientIndex)
                      }
                    />
                  </View>
                ))}
                <Button
                  title="Add Ingredient"
                  onPress={text => handleAddInput(item.key)}
                />
              </View>
            </ScrollView>
          )}

          {item.key === 'time' && (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <InputAtom
                value={inputValues[item.key]}
                setValue={text => handleInputChange(text, item.key)}
                placeholder={`Enter the ${item.title.toLowerCase()} of your recipe`}
                keyboardType="numeric"
                maxLength={3}
              />

              <Text style={styles.minText}>min</Text>
            </View>
          )}

          {item.key === 'instructions' && (
            <ScrollView style={styles.scrollContainer}>
              <View>
                {inputValues.instructions.map(
                  (instruction, instructionIndex) => (
                    <InputAtom
                      key={instructionIndex}
                      value={instruction}
                      setValue={text =>
                        handleInstructionChange(text, instructionIndex)
                      }
                      placeholder={`Enter instruction ${instructionIndex + 1}`}
                      multiline={true}
                    />
                  ),
                )}
                <Button
                  title="Add Instruction"
                  onPress={text => handleAddInput(item.key)}
                />
              </View>
            </ScrollView>
          )}

          {item.key === 'type' && (
            <SelectList
              save="value"
              selectedValue={inputValues[item.key]}
              data={[
                'Lunch',
                'Breakfast',
                'Salad',
                'Dinner',
                'Dessert',
                'Drinks',
                'Altele',
              ]}
              setSelected={val => handleInputChange(val, item.key)}
            />
          )}

          {index < data.length - 1 && (
            <View style={styles.button}>
              <ButtonAtom label="Next" onPress={() => handleNext(index)} />
            </View>
          )}
        </View>
        {index == data.length - 1 && (
          <View style={styles.button}>
            <ButtonAtom label="Done" onPress={() => handleNext(index)} />
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}>
        <Animated.FlatList
          ref={flatListRef}
          onScroll={onScroll}
          data={data}
          renderItem={({item, index}) => {
            return <RenderItem item={item} index={index} />;
          }}
          keyExtractor={item => item.id.toString()}
          scrollEventThrottle={16}
          horizontal={true}
          bounces={false}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  itemTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  itemText: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  selector: {
    marginVertical: 5,
  },
  scrollContainer: {
    maxHeight: 300,
  },
  minText: {
    fontSize: 19,
    marginLeft: 5,
  },
  button: {
    marginTop: 20,
    maxWidth: '35%',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});

export default OnboardingAddRecipe;