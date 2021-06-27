import React from 'react';
import { Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    color: '#111825',
    fontSize: 18,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
  },
});

// eslint-disable-next-line max-len
// eslint-disable-next-line react/jsx-filename-extension,react/destructuring-assignment,react/prop-types
const Mytext = (props) => <Text style={styles.text}>{props.text}</Text>;

export default Mytext;
