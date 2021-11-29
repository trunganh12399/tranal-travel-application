import React, {useState} from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
const LoadingIndicator = props => {
  const {
    visible,
    renderIndicator,
    indicatorColor,
    indicatorSize,
    backgroundColor,
    containerStyle,
  } = props;
  return (
    <>
      <Modal
        supportedOrientations={['portrait', 'landscape']}
        visible={visible}
        animationType="fade"
        transparent>
        <View
          style={[
            styles.container,
            {backgroundColor: 'rgba(0, 0, 0, 0.1)'},
            containerStyle,
          ]}>
          {renderIndicator ? (
            renderIndicator()
          ) : (
            <ActivityIndicator size={indicatorSize} color={indicatorColor} />
          )}
        </View>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});
LoadingIndicator.defaultProps = {
  visible: false,
  indicatorColor: '#ff8000',
  indicatorSize: 'large',
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
};

export default LoadingIndicator;
