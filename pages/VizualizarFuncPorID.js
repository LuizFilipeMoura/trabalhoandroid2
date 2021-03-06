import React, { useState } from 'react';
import {Text, View, SafeAreaView, Image, StyleSheet} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import {useAppContext} from './components/AppContext';

const db = openDatabase({ name: 'UserDatabase.db' });

const VizualizarFuncPorID = () => {
  const [inputUserId, setInputUserId] = useState('');
  const [funcData, setUserData] = useState({});
  const context = useAppContext();

  const searchUser = () => {
    setUserData({});
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_func where func_id = ? and user_id =?',
        [inputUserId, context.uid],
        (tx, results) => {
          const len = results.rows.length;
          if (len > 0) {
            setUserData(results.rows.item(0));
          } else {
            alert('Nenhum funcionario encontrado');
          }
        },
      );
    });
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
          <Mytextinput
            placeholder="Informe a Id do Funcionario "
            onChangeText={(inputUserId) => setInputUserId(inputUserId)}
            style={{ padding: 10 }}
          />
          <Mybutton title="Procurar Funcionario" customClick={searchUser} />
          <View style={{ marginLeft: 35, marginRight: 35, marginTop: 10 }}>
            <Text>
              Id do funcionário:
              {funcData.func_id}
            </Text>
            <Text>
              Nome:
              {funcData.func_name}
            </Text>
            <Text>
              Contato:
              {funcData.func_contact}
            </Text>
            <Text>
              Endereço:
              {funcData.func_address}
            </Text>
            <Text>
              Foto:
            </Text>
            <View style={styles.container}>
              {!!funcData.photo_url && (
                <>
                  <Image
                    source={{ uri: funcData.photo_url.toString() }}
                    style={{
                      height: 160, width: 160, resizeMode: 'stretch', alignItems: 'center',
                    }}
                  />
                </>
              ) }
            </View>
          </View>
        </View>
        <Text style={{ fontSize: 18, textAlign: 'center', color: 'grey' }}>
          Funcionário {funcData.func_name}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default VizualizarFuncPorID;
