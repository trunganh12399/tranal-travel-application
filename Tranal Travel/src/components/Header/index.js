import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {withNavigation} from '../../services/navigation-service/withNavigation';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Ionicons';
const {width, height} = Dimensions.get('window');
let clearTimeOutDisabled;
function Header(props) {
  const {
    navigation,
    onBackPress,
    backBtnEnable = true,
    textHeader = '',
    styleBody = null,
    headerType2 = false,
    buttonLeft,
    buttonRight,
  } = props;
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    return () => {
      clearTimeout(clearTimeOutDisabled);
    };
  }, []);
  function handleNavigationGoBack() {
    // setDisabled(true);
    // // enable after 0.5 second, prevent user double tap to back button
    // clearTimeOutDisabled = setTimeout(() => {
    //   setDisabled(false);
    // }, 500);
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  }

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <View style={[styles.leftH, {flex: headerType2 ? 1 : 1}]}>
          {buttonLeft ? (
            <View>{buttonLeft}</View>
          ) : backBtnEnable ? (
            <TouchableOpacity
              // disabled={disabled}
              hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
              onPress={() => handleNavigationGoBack()}
              style={styles.buttonBack}>
              <Icon1 name="chevron-back" size={30} color="white" />
              {/* <IconBack fill='#fff' width='16' height='16' /> */}
            </TouchableOpacity>
          ) : null}
        </View>
        <View
          style={[
            {justifyContent: 'center', alignItems: 'center', flex: 8},
            styleBody,
            {flex: headerType2 ? 6 : 8},
          ]}>
          <Text style={styles.txtHeader}>{textHeader}</Text>
        </View>
        <View style={[{flex: 1, padding: 5}, {flex: headerType2 ? 3 : 1}]}>
          {buttonRight ? buttonRight : <View />}
        </View>
      </View>
    </SafeAreaView>
  );
}

Header.defaultProps = {
  backBtnEnable: true,
  textHeader: '',
  styleBody: null,
  headerType2: false,
};

Header.propTypes = {
  navigation: PropTypes.any,
  onBackPress: PropTypes.func,
  backBtnEnable: PropTypes.bool,
  textHeader: PropTypes.string,
  styleBody: PropTypes.node,
  headerType2: PropTypes.bool,
  buttonLeft: PropTypes.any,
  buttonRight: PropTypes.any,
};

const HeaderShowNavigation = withNavigation(Header);

export default HeaderShowNavigation;
