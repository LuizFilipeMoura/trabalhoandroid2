import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import { sha256 } from 'react-native-sha256';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { useAppContext } from './components/AppContext';

const db = openDatabase({ name: 'UserDatabase.db' });

const Login = ({ navigation }) => {
  const context = useAppContext();

  useEffect(() => {
    db.transaction((txn) => {
      txn.executeSql(
        'SELECT name FROM sqlite_master '
        + "WHERE type='table' AND name='table_users'",
        [],
        (tx, res) => {
          if (res.rows.length === 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_users', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_users('
              + 'user_id INTEGER PRIMARY KEY AUTOINCREMENT, '
              + 'user_name VARCHAR(20), '
              + 'user_email VARCHAR(255), '
              + 'user_password VARCHAR(255))',
              [],
            );
          }
        },
      );
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_func'",
        [],
        (tx, res) => {
          if (res.rows.length === 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_func', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_func(func_id INTEGER PRIMARY KEY AUTOINCREMENT,'
              + ' func_name VARCHAR(20),'
              + ' func_contact INT(10),'
              + ' func_address VARCHAR(255),'
              + ' photo_url VARCHAR(255),'
              + ' user_id INTEGER)',
              [],
            );
          }
        },
      );
    });
  }, []);

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const verifyLogin = async () => {
    if (!userName) {
      alert('Informe um nome de usuário');
      return;
    }
    if (!password) {
      alert('Informe uma senha');
      return;
    }

    const hasedPass = await sha256(password);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_users where user_name = ? AND user_password = ?',
        [userName, hasedPass],
        (tx2, results) => {
          if (results.rows.item(0)) {
            Alert.alert(
              'Successo',
              'Login realizado com sucesso',
              [
                {
                  text: 'Ok',
                  onPress: () => {
                    context.setUid(results.rows.item(0).user_id);
                    navigation.navigate('HomeScreen');
                  },
                },
              ],
              { cancelable: false },
            );
          } else alert('Usuário Inválido');
        },
      );
    });
  };

  const register = () => {
    navigation.navigate('SignUp');
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
                placeholder="UserName"
                onChangeText={(e) => setUserName(e)}
                style={{ padding: 10 }}
              />

              <Mytextinput
                placeholder="Senha"
                onChangeText={(e) => setPassword(e)}
                maxLength={10}
                secure
                style={{ padding: 10 }}
              />

              <Mybutton title="Entrar" customClick={verifyLogin} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
        <Text style={{ fontSize: 18, textAlign: 'center', color: 'grey' }}>
          Não tem cadastro?
        </Text>
        <Mybutton title="Cadastre-se" customClick={register} />
      </View>
    </SafeAreaView>
  );
};

export default Login;
