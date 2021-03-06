import React, { useState, useEffect } from 'react';
import {
  FlatList, Text, View, SafeAreaView, Image, StyleSheet,
} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import { useAppContext } from './components/AppContext';

const db = openDatabase({ name: 'UserDatabase.db' });

const VizualizarTodosFunc = () => {
  const [flatListItems, setFlatListItems] = useState([]);
  const context = useAppContext();

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM table_func where user_id = ?', [context.uid],
        (tx, results) => {
          const temp = [];
          for (let i = 0; i < results.rows.length; ++i) temp.push(results.rows.item(i));
          setFlatListItems(temp);
        });
    });
  }, []);

  const listViewItemSeparator = () => (
    <View
      style={{ height: 0.2, width: '100%', backgroundColor: '#808080' }}
    />
  );
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
  const listItemView = (item) => (
    <View
      key={item.func_id}
      style={{ backgroundColor: 'white', padding: 20 }}
    >
      <Text>
        Id do Funcionário:
        {item.func_id}
      </Text>
      <Text>
        Nome:
        {item.func_name}
      </Text>
      <Text>
        Contato:
        {item.func_contact}
      </Text>
      <Text>
        Endereço:
        {item.func_address}
      </Text>
      <View style={styles.container}>
        {!!item.photo_url && (
          <>
            <Image
              source={{ uri: item.photo_url.toString() }}
              style={{
                height: 160, width: 160, resizeMode: 'stretch', alignItems: 'center',
              }}
            />
          </>
        ) }
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
        <Text style={{ fontSize: 18, textAlign: 'center', color: 'grey' }}>
          Vizulizar todos os funcionarios
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default VizualizarTodosFunc;
