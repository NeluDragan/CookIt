import React, {useState, useRef} from 'react';
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
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';

import InputAtom from '../Atoms/InputAtom';
import {data} from '../../data/recipeData';

const OnboardingAddRecipe = () => {
  const {width: SCREEN_WIDTH} = useWindowDimensions();
  const x = useSharedValue(0);
  const flatListRef = useRef(null);
  const [inputValues, setInputValues] = useState({
    title: '',
    ingredients: '',
    time: '',
    instructions: '',
    type: '',
    image: '',
  });

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x;
    },
  });

  const handleInputChange = (value, key) => {
    setInputValues(prevValues => ({...prevValues, [key]: value}));
  };

  const handleNext = index => {
    const currentItem = data[index];
    handleInputChange(inputValues[currentItem.key], currentItem.key);

    if (index < data.length - 1) {
      flatListRef.current.scrollToIndex({index: index + 1, animated: true});
    }
    console.log(inputValues);
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
          <InputAtom
            value={inputValues[item.key]}
            setValue={text => handleInputChange(text, item.key)}
            placeholder={`Enter the ${item.title.toLowerCase()} of your recipe`}
          />

          {index < data.length - 1 && (
            <Button title="Next" onPress={() => handleNext(index)} />
          )}
        </View>
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
  },
  itemText: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 20,
  },
});

export default OnboardingAddRecipe;
