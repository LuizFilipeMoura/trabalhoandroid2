import React, { useState } from 'react';
import {
  Text, View, Alert, SafeAreaView,
} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';

const db = openDatabase({ name: 'UserDatabase.db' });

const DeletarFunc = ({ navigation }) => {
  const [inputFuncId, setInputFuncId] = useState('');

  const deleteFunc = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  table_func where func_id=?',
        [inputFuncId],
        // eslint-disable-next-line no-shadow
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Func deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false },
            );
          } else {
            alert('Please insert a valid Func Id');
          }
        },
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytextinput
            placeholder="Enter Func Id"
            onChangeText={(inputFuncId) => setInputFuncId(inputFuncId)}
            style={{ padding: 10 }}
          />
          <Mybutton title="Delete Func" customClick={deleteFunc} />
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

export default DeletarFunc;
