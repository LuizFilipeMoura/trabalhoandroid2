import React, { useState } from 'react';
import {
  Text, View, Alert, SafeAreaView,
} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import {useAppContext} from './components/AppContext';

const db = openDatabase({ name: 'UserDatabase.db' });

const DeletarFunc = ({ navigation }) => {
  const [inputFuncId, setInputFuncId] = useState('');
  const context = useAppContext();

  const deleteFunc = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  table_func where func_id=? and user_id =?',
        [inputFuncId, context.uid],
        // eslint-disable-next-line no-shadow
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Funcionario deletado com sucesso',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false },
            );
          } else {
            alert('Por favor, coloque uma Id válida ');
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
            placeholder="Id do funcionário"
            onChangeText={(e) => setInputFuncId(e)}
            style={{ padding: 10 }}
          />
          <Mybutton title="Delete Func" customClick={deleteFunc} />
        </View>
        <Text style={{ fontSize: 18, textAlign: 'center', color: 'grey' }}>
          Deletando o funcionário {inputFuncId}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default DeletarFunc;
