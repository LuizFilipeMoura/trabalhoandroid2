import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';

const db = openDatabase({ name: 'UserDatabase.db' });



const RegistrarFunc = ({ navigation }) => {
  const [funcName, setUserName] = useState('');
  const [funcContact, setUserContact] = useState('');
  const [funcAddress, setUserAddress] = useState('');

  const registerUser = () => {
    console.log(funcName, funcContact, funcAddress);

    if (!funcName) {
      alert('Please fill name');
      return;
    }
    if (!funcContact) {
      alert('Please fill Contact Number');
      return;
    }
    if (!funcAddress) {
      alert('Please fill Address');
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO table_func (func_name, func_contact, func_address) VALUES (?,?,?)',
        [funcName, funcContact, funcAddress],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false },
            );
          } else alert('Registration Failed');
        },
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}
            >
              <Mytextinput
                placeholder="Enter Name"
                onChangeText={(e) => setUserName(e)}
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Enter Contact No"
                onChangeText={(e) => setUserContact(e)}
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Enter Address"
                onChangeText={(e) => setUserAddress(e)}
                maxLength={225}
                numberOfLines={5}
                multiline
                style={{ textAlignVertical: 'top', padding: 10 }}
              />
              <Mybutton title="Submit" customClick={registerUser} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
        <Text style={{ fontSize: 18, textAlign: 'center', color: 'grey' }}>
          Registro de um novo funcionário
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default RegistrarFunc;
