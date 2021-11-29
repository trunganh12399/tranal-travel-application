import React from 'react';
import {View, TextInput} from 'react-native';
import styles from './styles';
const Input = props => {
  const {
    placeHolder,
    placeHolderColor,
    style,
    removeValidateText,
    marginHori,
    value,
    styleInput,
  } = props;
  return (
    <View
      style={[
        styles.container,
        {marginHorizontal: marginHori ? marginHori : 20},
        style,
      ]}>
      <TextInput
        {...props}
        style={[styles.input, styleInput]}
        placeholder={placeHolder}
        placeholderTextColor={placeHolderColor ? placeHolderColor : 'gray'}
        value={value}
        onFocus={() => (removeValidateText ? removeValidateText('') : null)}
      />
    </View>
  );
};
export default Input;
