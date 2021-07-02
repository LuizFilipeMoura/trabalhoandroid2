import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { useAppContext } from './components/AppContext';

const db = openDatabase({ name: 'UserDatabase.db' });

const RegistrarFunc = ({ navigation }) => {
  const [funcName, setUserName] = useState('');
  const [funcContact, setUserContact] = useState('');
  const [funcAddress, setUserAddress] = useState('');
  const context = useAppContext();

  useEffect(() => {
    context.setPhotoUrl('');
  }, []);

  const registerFunc = () => {

    if (!funcName) {
      alert('Adicione um nome pro funcionario');
      return;
    }
    if (!funcContact) {
      alert('Adicione um telefone');
      return;
    }
    if (!funcAddress) {
      alert('Adicione o endereço do funcionário');
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO table_func (func_name, func_contact, func_address, user_id, photo_url) VALUES (?,?,?,?,?)',
        [funcName, funcContact, funcAddress, context.uid, context.photoUrl],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Funcionario registrado com sucesso',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false },
            );
          } else alert('Erro no registro');
        },
      );
    });
  };

  const tirarFoto = () => {
    navigation.navigate('Camera');
  };
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      width: 300,
      height: 400,
    },
  });
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
                placeholder="Nome Funcionário"
                onChangeText={(e) => setUserName(e)}
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Número Telefone"
                onChangeText={(e) => setUserContact(e)}
                maxLength={12}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Endereço do funcionário"
                onChangeText={(e) => setUserAddress(e)}
                maxLength={225}
                numberOfLines={5}
                multiline
                style={{ textAlignVertical: 'top', padding: 10 }}
              />
              <Mybutton title="Tirar Foto" customClick={tirarFoto} />

              <View style={styles.container}>
                {!!context.photoUrl && (
                  <>
                    <Image
                      source={{ uri: context.photoUrl.toString() }}
                      style={{
                        height: 160, width: 160, resizeMode: 'stretch', alignItems: 'center',
                      }}
                    />
                  </>
                ) }
              </View>

              <Mybutton title="Cadastrar" customClick={registerFunc} />

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
