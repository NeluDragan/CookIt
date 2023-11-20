import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SECONDARY_COLOR_2} from '../../Style/Colors';

const InstructionsContent = ({recipe}) => (
  <View style={{marginTop: 15}}>
    {recipe.instructions.map((step, index) => (
      <View style={styles.InstructionsContainer} key={index + 1}>
        <Text style={styles.InstructionsNumber}>{`${index + 1}`}</Text>
        <Text style={styles.InstructionsText}>{` ${step}`}</Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  InstructionsContainer: {
    marginVertical: 7,
    marginHorizontal: 15,
    flexDirection: 'row',
  },
  InstructionsText: {
    marginHorizontal: 40,
    fontSize: 14,
  },
  InstructionsNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: SECONDARY_COLOR_2,
    borderRadius: '50%',
  },
});

export default InstructionsContent;
