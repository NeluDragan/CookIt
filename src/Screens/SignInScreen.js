import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import Logo from '../images/logo.png';
import InputAtom from '../Components/Atoms/InputAtom';
import ButtonAtom from '../Components/Atoms/ButtonAtom';
import {AuthContext} from '../context/AuthContext';

import BackgroundImage from '../images/bg1.jpg';

const SignInScreen = ({navigation}) => {
  const {login} = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {height} = useWindowDimensions();

  const handleSignUpPress = () => {
    navigation.navigate('Register');
  };

  return (
    <ImageBackground source={BackgroundImage} style={styles.root}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, {height: height * 0.15}]}
          resizeMode="contain"
        />

        <View style={styles.loginContainer}>
          <InputAtom
            placeholder="Username"
            value={username}
            setValue={setUsername}
          />
          <InputAtom
            placeholder="Password"
            value={password}
            setValue={setPassword}
          />
          <View style={styles.button}>
            <ButtonAtom
              label="Log In"
              onPress={() => {
                login();
              }}
            />
          </View>
        </View>
        <View style={styles.signupText}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={handleSignUpPress}>
            <Text style={{color: 'blue'}}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    maxWidth: 300,
    maxHeight: 200,
    marginTop: 50,
  },
  button: {
    marginTop: 20,
  },
  loginContainer: {
    alignItems: 'center',
    marginTop: '20%',
  },
  signupText: {
    marginTop: 20,
    flexDirection: 'row',
  },
});

export default SignInScreen;
