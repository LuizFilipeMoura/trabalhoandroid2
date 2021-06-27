import React, { useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';

const db = openDatabase({ name: 'FuncDatabase.db' });

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_func'",
        [],
        (tx, res) => {
          console.log('item:', res.rows.length);
          if (res.rows.length === 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_func', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_func(func_id INTEGER PRIMARY KEY AUTOINCREMENT, func_name VARCHAR(20), func_contact INT(10), func_address VARCHAR(255))',
              [],
            );
          }
        },
      );
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_users'",
        [],
        (tx, res) => {
          console.log('item:', res.rows.length);
          if (res.rows.length === 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_users', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_users(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_email VARCHAR(255), user_password VARCHAR(255))',
              [],
            );
          }
        },
      );
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytext text="Controle de Pessoal" />
          <Mybutton
            title="Registrar Funcionário"
            customClick={() => navigation.navigate('RegisterFunc')}
          />
          <Mybutton
            title="Editar Funcionário"
            customClick={() => navigation.navigate('UpdateFunc')}
          />
          <Mybutton
            title="Pesquisar Funcionário por ID "
            customClick={() => navigation.navigate('ViewFunc')}
          />
          <Mybutton
            title="Ver todos"
            customClick={() => navigation.navigate('ViewAllFunc')}
          />
          <Mybutton
            title="Remover"
            customClick={() => navigation.navigate('DeleteFunc')}
          />
        </View>
        <Text style={{ fontSize: 18, textAlign: 'center', color: 'grey' }}>
          Cadastre e vizualize os funcionários
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
