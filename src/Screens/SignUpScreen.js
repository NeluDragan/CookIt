import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import ButtonAtom from '../Components/Atoms/ButtonAtom';
import InputAtom from '../Components/Atoms/InputAtom';
import axios from 'axios';
import {AuthContext} from '../context/AuthContext';

import BackgroungIMG from '../images/background/bg.jpg';

const SignUpScreen = ({navigation}) => {
  const {login} = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:3001/createUser', {
        email,
        password,
        name: username,
      });

      // Handle the response as needed, e.g., show a success message or navigate to another screen.
      console.log('Sign-up successful:', response.data);
      const {token, user} = response.data;
      console.log('token', token);
      login(token, user);
    } catch (error) {
      // Handle sign-up error, e.g., show an error message.
      console.error('Sign-up error:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  return (
    <ImageBackground source={BackgroungIMG} style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <InputAtom
          placeholder="Username"
          value={username}
          setValue={setUsername}
          onChangeText={text => setUsername(text)}
        />
        <InputAtom
          placeholder="Password"
          value={password}
          setValue={setPassword}
          onChangeText={text => setPassword(text)}
          secureTextEntry={!passwordVisibility}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.visibilityBtn}
          onPress={togglePasswordVisibility}>
          <Image
            source={
              passwordVisibility
                ? require('../images/hide.png')
                : require('../images/view.png')
            }
            style={styles.visibilityIcon}
          />
        </TouchableOpacity>
        <InputAtom
          placeholder="Email"
          value={email}
          setValue={setEmail}
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
  visibilityBtn: {
    position: 'absolute',
    right: 7,
    height: 65,
    width: 30,
  },
  visibilityIcon: {
    width: 22,
    height: 22,
  },
});

export default SignUpScreen;
