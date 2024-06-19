import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import InputAtom from '../../Atoms/InputAtom';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    if (feedback.trim()) {
      Alert.alert('Feedback Submitted', 'Thank you for your feedback!');
      setFeedback('');
    } else {
      Alert.alert('Error', 'Please enter your feedback.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feedback</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your feedback here"
        value={feedback}
        onChangeText={setFeedback}
        multiline
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 100,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    textAlignVertical: 'top',
  },
});

export default Feedback;
