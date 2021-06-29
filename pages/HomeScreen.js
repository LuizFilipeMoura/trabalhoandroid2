import React, {useContext, useEffect} from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import {UserContext} from './components/UserContext';

const db = openDatabase({ name: 'UserDatabase.db' });

const HomeScreen = ({ navigation }) => {


  const uid = useContext(UserContext);


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
