import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import ButtonAtom from '../Components/Atoms/ButtonAtom';
import InputAtom from '../Components/Atoms/InputAtom';

import BackgroungIMG from '../images/bg.jpg';

const SignUpScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSignUp = () => {
    // Implement your sign-up logic here
  };

  return (
    <ImageBackground source={BackgroungIMG} style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <InputAtom
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <InputAtom
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <InputAtom
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <View style={styles.button}>
          <ButtonAtom label="Sign UP" onPress={handleSignUp} />
        </View>
        <View style={styles.signupText}>
          <Text>Go back to </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{color: 'blue'}}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  button: {
    paddingTop: 20,
  },
  signupText: {
    marginTop: 20,
    flexDirection: 'row',
  },
});

export default SignUpScreen;
