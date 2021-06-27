import React from 'react';
import { View, TextInput } from 'react-native';

const Mytextinput = (props) => (
  <View
    style={{
      marginLeft: 35,
      marginRight: 35,
      marginTop: 10,
      borderColor: '#007FFF',
      borderWidth: 1,
    }}
  >
    <TextInput
      underlineColorAndroid="transparent"
      placeholder={props.placeholder}
      placeholderTextColor="#007FFF"
      keyboardType={props.keyboardType}
      onChangeText={props.onChangeText}
      returnKeyType={props.returnKeyType}
      numberOfLines={props.numberOfLines}
      multiline={props.multiline}
      secureTextEntry={props.secure}
      onSubmitEditing={props.onSubmitEditing}
      style={props.style}
      blurOnSubmit={false}
      value={props.value}
    />
  </View>
);

export default Mytextinput;
