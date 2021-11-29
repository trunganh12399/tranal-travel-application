import React, {memo, Dispatch, SetStateAction} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
const PickerBase = props => {
  const {
    title,
    valueSelect,
    dataPicker,
    onChangePicker,
    placeHolder,
    styleText,
    styleContainer,
    navigation,
  } = props;
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ScreenItemPicker', {
          title: title,
          selected: valueSelect,
          data: dataPicker,
          onSelect: value => {
            onChangePicker ? onChangePicker(value) : null;
          },
        })
      }
      style={[styles.infoView, styleContainer]}>
      <Text style={[styles.text, styleText]}>
        {valueSelect?.label ? valueSelect?.label : placeHolder}
      </Text>
      <Feather name="chevron-right" size={23} color={'black'} />
    </TouchableOpacity>
  );
};

export default memo(PickerBase);

const styles = StyleSheet.create({
  infoView: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderRadius: 8,
    borderWidth: 0.5,
  },
  text: {
    color: 'black',
    fontSize: 16,
    lineHeight: 20,
  },
});
