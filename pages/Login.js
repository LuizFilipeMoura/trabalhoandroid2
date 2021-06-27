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
import { sha256 } from 'react-native-sha256';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';

const db = openDatabase({ name: 'UserDatabase.db' });

const Login = ({ navigation }) => {
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

    try {
      const a = await sha256(password);
      console.log(a);
    } catch (e) {
      console.log(e);
    }

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_users (user_name, user_password) WHERE (user_name = ? AND user_password = ?)',
        [userName, password],
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
                keyboardType="numeric"
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
