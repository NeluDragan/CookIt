import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {Dimensions} from 'react-native';
import ButtonAtom from '../../Atoms/ButtonAtom';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const InstructionsContent = ({recipe}) => (
  <View style={styles.screen}>
    <ScrollView>
      {recipe.instructions.map((step, index) => (
        <View style={styles.InstructionsContainer} key={index + 1}>
          <Text style={styles.InstructionsNumber}>{`${index + 1}`}</Text>
          <Image
            source={require('../../../images/icons/circle.png')}
            resizeMode="contain"
            style={styles.icon}
          />
          <Text style={styles.InstructionsText}>{` ${step}`}</Text>
        </View>
      ))}
    </ScrollView>
    <View style={styles.button}>
      <ButtonAtom label={'Start Cooking'} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  screen: {
    marginTop: 15,
    justifyContent: 'space-between',
  },
  InstructionsContainer: {
    marginVertical: 7,
    marginHorizontal: 15,
    flexDirection: 'row',
  },
  InstructionsText: {
    marginHorizontal: 25,
    fontSize: 14,
  },
  InstructionsNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 7.5,
  },
  icon: {
    position: 'absolute',
    width: 25,
    height: 25,
    opacity: 0.3,
    marginTop: -4,
  },
  button: {
    position: 'absolute',
    top: windowHeight - 400,
    width: windowWidth,
  },
});

export default InstructionsContent;
