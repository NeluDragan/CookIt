import React, {useRef, useState, useEffect, useContext} from 'react';
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
import {SelectList} from 'react-native-dropdown-select-list';
import InputAtom from '../../Atoms/InputAtom';
import {data} from '../../../data/recipeData';
import {useInputValues} from './inputValues';
import ButtonAtom from '../../Atoms/ButtonAtom';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext';
import {showToast} from '../../Atoms/ToastAtom';

const OnboardingAddRecipe = () => {
  const {width: SCREEN_WIDTH} = useWindowDimensions();
  const flatListRef = useRef(null);
  const {userToken} = useContext(AuthContext);
  const [userId, setUserId] = useState('');
  const {inputValues, setInputValues} = useInputValues({
    editingIndex: -1,
    text: '',
  });
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    if (userToken) {
      axios
        .get('http://localhost:3001/getUserByToken', {
          headers: {
            Authorization: userToken,
          },
        })
        .then(response => {
          const {_id} = response.data;
          setUserId(_id);
        })
        .catch(error => {
          console.error('Error fetching user information:', error);
        });
    }
  }, [userToken]);

  const handleNext = async () => {
    if (currentItemIndex < data.length - 1) {
      flatListRef.current.scrollTo({
        x: (currentItemIndex + 1) * SCREEN_WIDTH,
        animated: true,
      });
      setCurrentItemIndex(currentItemIndex + 1);
    } else {
      try {
        inputValues.createdBy = userId;
        const response = await fetch('http://localhost:3001/addRecipe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(inputValues),
        });
        const data1 = await response.json();

        if (response.ok) {
          const userRecipesUpdateResponse = await axios.post(
            'http://localhost:3001/handleUserRecipes',
            {
              userId: userId,
              recipeId: data1._id,
              action: 'add',
            },
          );
          console.log(
            'User recipes updated successfully:',
            userRecipesUpdateResponse.data,
          );

          setInputValues({
            editingIndex: 0,
            text: '',
            name: '',
            ingredients: [
              {
                id: '',
                quantity: '',
              },
            ],
            preparationTime: '',
            instructions: [],
            type: '',
            image: '',
            createdBy: '',
          });
          setSelectedIngredients([]);
          flatListRef.current.scrollTo({index: 0});
          showToast('success', 'Rețeta a fost adaugata cu succes.', '');
        } else {
          showToast(
            'error',
            'Rețeta nu a putut fi adaugata',
            'Verificati daca ati introdus toate datele corect.',
          );
        }
      } catch (error) {
        console.error('Error saving recipe:', error);
      }
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    try {
      const response = await fetch('http://localhost:3001/ingredient');
      const responseData = await response.json();
      const updatedIngredients = responseData.map(ingredient => ({
        name: ingredient.name,
        unit: ingredient.unit,
      }));
      updatedIngredients.sort((a, b) => a.name.localeCompare(b.name));
      setIngredients(updatedIngredients);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    }
  };

  const handleInputChange = (value, key) => {
    setInputValues(prevValues => ({...prevValues, [key]: value}));
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

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setInputValues(prevValues => ({
          ...prevValues,
          image: imageUri,
        }));
      }
    });
  };

  const handleIngredientChange = async (value, ingredientIndex) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/getIngredientByName/${value}`,
      );
      const ingredient = response.data[0];
      const updatedIngredients = [...inputValues.ingredients];
      const updatedIngredient = {
        id: ingredient._id,
        quantity: updatedIngredients[ingredientIndex]?.quantity || '',
        unit: ingredient.unit,
      };
      updatedIngredients[ingredientIndex] = updatedIngredient;
      setInputValues(prevValues => ({
        ...prevValues,
        ingredients: updatedIngredients,
      }));
    } catch (error) {
      console.error('Error fetching ingredient by name:', error);
    }
  };

  const handleIngredientQuantityChange = (value, ingredientIndex) => {
    const updatedIngredients = [...inputValues.ingredients];
    updatedIngredients[ingredientIndex] = {
      id: inputValues.ingredients[ingredientIndex]?.id || '',
      quantity: value,
    };
    setInputValues(prevValues => ({
      ...prevValues,
      ingredients: updatedIngredients,
    }));
  };

  const handleInstructionChange = (text, instructionIndex) => {
    const updatedInstructions = [...inputValues.instructions];
    updatedInstructions[instructionIndex] = text;
    setInputValues(prevValues => ({
      ...prevValues,
      instructions: updatedInstructions,
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}>
        <ScrollView
          ref={flatListRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{width: SCREEN_WIDTH * data.length}}
          scrollEventThrottle={16}
          onScroll={event => {
            const offsetX = event.nativeEvent.contentOffset.x;
            const newIndex = Math.floor(offsetX / SCREEN_WIDTH);
            setCurrentItemIndex(newIndex);
          }}>
          {data.map((item, index) => (
            <View
              style={[styles.itemContainer, {width: SCREEN_WIDTH}]}
              key={item.id}>
              <Image
                source={item.image}
                style={{width: SCREEN_WIDTH * 0.5, height: SCREEN_WIDTH * 0.5}}
              />
              <View>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemText}>{item.text}</Text>
                {item.key === 'name' && (
                  <InputAtom
                    setValue={text => handleInputChange(text, item.key)}
                    placeholder={`Enter the ${item.title.toLowerCase()} of your recipe`}
                    value={inputValues[item.key]}
                  />
                )}

                {item.key === 'ingredients' && (
                  <ScrollView style={styles.scrollContainer}>
                    <View>
                      {selectedIngredients.map(
                        (ingredient, ingredientIndex) => (
                          <View
                            key={ingredientIndex}
                            style={styles.ingredientContainer}>
                            <View style={styles.selector}>
                              <SelectList
                                setSelected={val =>
                                  handleIngredientChange(val, ingredientIndex)
                                }
                                data={ingredients.map(({name}) => name)}
                                save="value"
                                selectedValue={ingredient}
                                notFoundText="Ingredient not found, please add it to the list."
                                searchPlaceholder="Search for an ingredient"
                                search={false}
                              />
                            </View>
                            <View style={styles.quantityInput}>
                              <InputAtom
                                value={
                                  inputValues['ingredients'][ingredientIndex]
                                    ?.quantity
                                }
                                setValue={text =>
                                  handleIngredientQuantityChange(
                                    text,
                                    ingredientIndex,
                                  )
                                }
                                placeholder={
                                  inputValues['ingredients'][ingredientIndex]
                                    ?.unit
                                }
                                keyboardType="numeric"
                              />
                            </View>
                          </View>
                        ),
                      )}
                      <Button
                        title="Add Ingredient"
                        onPress={() => handleAddInput(item.key)}
                      />
                    </View>
                  </ScrollView>
                )}

                {item.key === 'preparationTime' && (
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
                            placeholder={`Enter instruction ${
                              instructionIndex + 1
                            }`}
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
                      'Other',
                    ]}
                    setSelected={val => handleInputChange(val, item.key)}
                  />
                )}

                {item.key === 'image' && (
                  <View>
                    {inputValues[item.key] && (
                      <Image
                        source={{uri: inputValues[item.key]}}
                        style={{flex: 1, maxHeight: '40%'}}
                        resizeMode="contain"
                      />
                    )}
                    <Button title="Choose Photo" onPress={openImagePicker} />
                    {inputValues.time && (
                      <Image
                        source={{uri: inputValues.time}}
                        style={styles.image}
                      />
                    )}
                  </View>
                )}

                {index < data.length - 1 && (
                  <View style={styles.button}>
                    <ButtonAtom
                      label="Next"
                      onPress={() => handleNext(index)}
                    />
                  </View>
                )}
              </View>
              {index === data.length - 1 && (
                <View style={styles.button}>
                  <ButtonAtom label="Done" onPress={() => handleNext(index)} />
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  button: {
    marginTop: 20,
    maxWidth: '35%',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  scrollContainer: {
    maxHeight: 280,
    marginBottom: 20,
  },
  selector: {
    marginBottom: 9,
    width: 200,
  },
  quantityInput: {
    width: 85,
  },
  ingredientContainer: {
    flexDirection: 'row',
  },
});

export default OnboardingAddRecipe;
