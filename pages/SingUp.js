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

const SignUp = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const registerUser = async () => {
    if (!userName) {
      alert('Informe um nome de usuário');
      return;
    }
    if (password !== repeatPassword) {
      alert('Senhas nâo estão iguais');
      return;
    }
    if (!password) {
      alert('Informe uma senha');
      return;
    }

    const validateEmail = (emailAdress) => {
      const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (emailAdress.match(regexEmail)) {
        return true;
      }
      return false;
    };

    if (!validateEmail(email)) {
      alert('Email invalido');
      return;
    }

    const hasedPass = await sha256(password);

    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO table_users ( user_name, user_email , user_password) VALUES (?,?,?)',
        [userName, email, hasedPass],
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
                placeholder="UserName"
                onChangeText={(e) => setUserName(e)}
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Email"
                onChangeText={(e) => setEmail(e)}
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
              <Mytextinput
                placeholder="Repetir a Senha"
                onChangeText={(e) => setRepeatPassword(e)}
                maxLength={10}
                secure
                keyboardType="numeric"
                style={{ padding: 10 }}
              />
              <Mybutton title="Submit" customClick={registerUser} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
        <Text style={{ fontSize: 18, textAlign: 'center', color: 'grey' }}>
          Cadastro de usuário
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
