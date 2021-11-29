import {useNavigation} from '@react-navigation/native'; // not sure package name
import React from 'react';

export const withNavigation = Component => {
  return props => {
    const navigation = useNavigation();

    return <Component navigation={navigation} {...props} />;
  };
};
