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

const AtualizarFunc = ({ navigation }) => {
  const [inputFuncId, setInputFuncId] = useState('');
  const [funcName, setFuncName] = useState('');
  const [funcContact, setFuncContact] = useState('');
  const [funcAddress, setFuncAddress] = useState('');

  const updateAllStates = (name, contact, address) => {
    setFuncName(name);
    setFuncContact(contact);
    setFuncAddress(address);
  };

  const searchFunc = () => {
    console.log(inputFuncId);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_func where func_id = ?',
        [inputFuncId],
        (tx, results) => {
          const len = results.rows.length;
          if (len > 0) {
            const res = results.rows.item(0);
            updateAllStates(res.func_name, res.func_contact, res.func_address);
          } else {
            alert('No func found');
            updateAllStates('', '', '');
          }
        },
      );
    });
  };
  const updateFunc = () => {
    console.log(inputFuncId, funcName, funcContact, funcAddress);

    if (!inputFuncId) {
      alert('Please fill Func id');
      return;
    }
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
        'UPDATE table_func set func_name=?, func_contact=? , func_address=? where func_id=?',
        [funcName, funcContact, funcAddress, inputFuncId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Func updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false },
            );
          } else alert('Updation Failed');
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
                placeholder="Enter Func Id"
                style={{ padding: 10 }}
                onChangeText={(inputFuncId) => setInputFuncId(inputFuncId)}
              />
              <Mybutton title="Search Func" customClick={searchFunc} />
              <Mytextinput
                placeholder="Enter Name"
                value={funcName}
                style={{ padding: 10 }}
                onChangeText={(funcName) => setFuncName(funcName)}
              />
              <Mytextinput
                placeholder="Enter Contact No"
                value={`${funcContact}`}
                onChangeText={(funcContact) => setFuncContact(funcContact)}
                maxLength={10}
                style={{ padding: 10 }}
                keyboardType="numeric"
              />
              <Mytextinput
                value={funcAddress}
                placeholder="Enter Address"
                onChangeText={(funcAddress) => setFuncAddress(funcAddress)}
                maxLength={225}
                numberOfLines={5}
                multiline
                style={{ textAlignVertical: 'top', padding: 10 }}
              />
              <Mybutton title="Update Func" customClick={updateFunc} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
        <Text style={{ fontSize: 18, textAlign: 'center', color: 'grey' }}>
          Example of SQLite Database in React Native
        </Text>
        <Text style={{ fontSize: 16, textAlign: 'center', color: 'grey' }}>
          www.aboutreact.com
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default AtualizarFunc;