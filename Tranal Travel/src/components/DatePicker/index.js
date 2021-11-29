import React, {useState, useEffect} from 'react';
import {
  Button,
  TouchableOpacity,
  View,
  ViewPropTypes,
  StyleSheet,
  Text,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import PropTypes from 'prop-types';

import moment from 'moment';

const DateTimePickerData = props => {
  const {
    title,
    placeholder,
    containerStyle,
    headerStyle,
    style,
    containerStyleIcon,
    IconRight,
    mode = 'date',
    dateFormat = 'DD-MM-YYYY',
    value = '',
    stylesPlacehoder,
    onChange,
  } = props;

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [stringVal, setStringVal] = useState(value ? value : '');

  const convertDateFrom = (value, mode) => {
    if (value == null || value == undefined || value == '') return '';
    if (mode == 'date') {
      return moment(value).format("DD/MM/YYYY");
    } else {
      return moment(value).format("hh:mm");
    }
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setStringVal(date.toString());
    onChange(date);
    hideDatePicker();
  };

  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={showDatePicker}
        style={[styles.containers, containerStyle]}>
        {stringVal && value? (
          //hiện ra dong dd-mm-yyyy
          <Text style={[{fontSize:16}, style]}>
            {convertDateFrom(stringVal, mode)}
          </Text>
        ) : null}
        {stringVal && value? null : (
          // hiện ra dòng placeholder
          <Text
            style={[
              {fontSize: 16,color:'black', alignSelf:'center'},
              stylesPlacehoder,
            ]}>
            {placeholder}
          </Text>
        )}
        <View style={[styles.containersViewIcon, containerStyleIcon]}>
          {IconRight}
        </View>
      </TouchableOpacity>
      <DateTimePickerModal
        {...props}
        isVisible={isDatePickerVisible}
        mode={mode}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        dateFormat={dateFormat}
      />
    </View>
  );
};
DateTimePickerData.propTypes = {
  placeholder: PropTypes.string,
  title: PropTypes.string,
  containerStyle: ViewPropTypes.style,
  headerStyle: ViewPropTypes.style,
  style: ViewPropTypes.style,
  containerStyleIcon: ViewPropTypes.style,
  IconRight: PropTypes.element,
  mode: PropTypes.string,
  dateFormat: PropTypes.string,
  value: PropTypes.string,
  stylesPlacehoder: ViewPropTypes.style,
  onChange: PropTypes.func,
};
const styles = StyleSheet.create({
  containers: {
    height: 50,
    // width: 200,
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    paddingLeft: 12,
    justifyContent:'center',
    // flex: 1,
  },
  containersViewIcon: {
    top:0,
    right: 0,
    height:50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    position: 'absolute',
  },
});
export default DateTimePickerData;
