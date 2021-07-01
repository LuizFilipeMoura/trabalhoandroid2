import React, {useEffect, useState} from 'react';
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
import { useAppContext } from './components/AppContext';

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

  const context = useAppContext();

  const searchFunc = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_func where func_id = ? AND user_id = ?',
        [inputFuncId, context.uid],
        (tx, results) => {
          const len = results.rows.length;
          if (len > 0) {
            const res = results.rows.item(0);
            console.log(address);
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
    if (!inputFuncId) {
      alert('Adicione a Id de um funcionário');
      return;
    }
    if (!funcName) {
      alert('Adicione o nome do Funcionário');
      return;
    }
    if (!funcContact) {
      alert('Adicione o contato');
      return;
    }
    if (!funcAddress) {
      alert('Adicione o endereço');
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
                placeholder="Id do Funcionário"
                style={{ padding: 10 }}
                onChangeText={(e) => setInputFuncId(e)}
              />
              <Mybutton title="Search Func" customClick={searchFunc} />
              <Mytextinput
                placeholder="Nome"
                value={funcName}
                style={{ padding: 10 }}
                onChangeText={(e) => setFuncName(e)}
              />
              <Mytextinput
                placeholder="Contato"
                value={`${funcContact}`}
                onChangeText={(e) => setFuncContact(e)}
                maxLength={10}
                style={{ padding: 10 }}
                keyboardType="numeric"
              />
              <Mytextinput
                value={funcAddress}
                placeholder="Endereço"
                onChangeText={(e) => setFuncAddress(e)}
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
          Editando o funcionario
          {' '}
          {inputFuncId}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default AtualizarFunc;
