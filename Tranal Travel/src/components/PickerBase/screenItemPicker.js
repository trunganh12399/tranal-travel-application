
import Header from '../Header/index';
import React, { memo } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Desmin,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import Feather from "react-native-vector-icons/Feather";
const {width, height} = Dimensions.get('window')


const ScreenItemPicker = ({navigation, route}) => {
  const { selected, title, data, onSelect } = route?.params;
  return (
    <SafeAreaView style={styles.safeView}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.safeView}>
        <Header textHeader={title ?? ''} />
        <View contentContainerStyle={styles.flexGrow}>
          {data ? (
            <>
              {selected?.label && (
                <View>
                  <Text style={[styles.text, { marginTop: 30 }]}>SELECTED</Text>
                  <View style={styles.infoView}>
                    <Text style={[styles.text, { color: 'black' }]}>{selected?.label}</Text>
                  </View>
                </View>
              )}
              <Text style={[styles.text, { marginTop: 30, marginBottom: 12 }]}>ANOTHER CHOICE</Text>
              <FlatList
                style={styles.root}
                data={data}
                extraData={data}
                ItemSeparatorComponent={() => {
                  return <View style={styles.separator} />;
                }}
                renderItem={item => {
                  console.log('item', item)
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        onSelect(item.item);
                        navigation.goBack();
                      }}
                      style={styles.infoView}>
                      <Text style={[styles.text,{color:'black'}]}>{item.item?.label}</Text>
                      <Feather
                        name="chevron-right"
                        size={23}
                        color={'blue'}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            </>
          ) : (
              <Text style={styles.text}>List is empty</Text>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default memo(ScreenItemPicker);

const styles = StyleSheet.create({
  text: {
    color: 'blue',
    fontSize: 18,
    lineHeight: 20,
    marginTop: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  title: {
    textAlign: 'center',
    width: width,
    color: 'black',
    fontSize: 14,
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  infoView: {
    width: width,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderTopWidth: 0.25,
    borderBottomWidth: 0.25
  },
  button: {
    width: width,
    height: 45,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: "white",
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 18,
  },
  safeView: {backgroundColor: 'white', flex: 1},
  flexGrow: {
    paddingTop: 12,
  },
  separator: {
    height: 1,
  },
  root: {},
});
