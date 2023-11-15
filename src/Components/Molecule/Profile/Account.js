import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import InputAtom from '../../Atoms/InputAtom';
import ButtonAtom from '../../Atoms/ButtonAtom';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext';

const Account = ({route, navigation}) => {
  const [newName, setNewName] = useState(route.params?.name || '');
  const [newEmail, setNewEmail] = useState(route.params?.email || '');
  const {userToken} = useContext(AuthContext);

  const handleUpdate = async () => {
    Alert.alert(
      'Confirm Update',
      'Are you sure you want to update your information?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              const headers = {
                Authorization: userToken,
              };

              const response = await axios.post(
                `http://localhost:3001/updateUser`,
                {
                  name: newName,
                  email: newEmail,
                },
                {headers},
              );

              console.log('Update successful:', response.data);
            } catch (error) {
              console.error('Error updating user:', error);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit User Info</Text>
      <Text style={styles.label}>Current Name:</Text>
      <Text style={styles.currentInfo}>{route.params?.name}</Text>
      <InputAtom
        placeholder={newName}
        setValue={setNewName}
        onChangeText={text => setNewName(text)}
      />
      <Text style={styles.label}>Current Email:</Text>
      <Text style={styles.currentInfo}>{route.params?.email}</Text>
      <InputAtom
        placeholder={newEmail}
        onChangeText={text => setNewEmail(text)}
      />
      <ButtonAtom label="Update" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  currentInfo: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default Account;
