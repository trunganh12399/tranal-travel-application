import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { Picker } from '@react-native-picker/picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../../components/Header/index';
import { isEmail } from '../../../utilities/index';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from 'react-native-vector-icons/Ionicons';
function CreateRestaurant({ navigation }) {
  const [selectedValue, setSelectedValue] = useState();
  const [data, setData] = useState({
    name: '',
    userName: '',
    password: '',
    role: 'ManagerRestaurant',
  });
  const InserUserToTable = async () => {
    let body = {
      name: data?.name,
      userName: data?.userName,
      password: data?.password,
      role: data?.role,
      titleShop: '',
      AddressShop: '',
      timeStart: '',
      timeEnd: '',
    };
    await firestore().collection('users').add(body);
  };

  const onRegister = () => {
    if (
      data.userName.length == 0 ||
      data.password.length == 0 ||
      data.name.length == 0
    ) {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin', [
        { text: 'Okay' },
      ]);
    } else if (!isEmail(data.userName)) {
      Alert.alert('Thông báo', 'Vui lòng nhập đúng định dạng email', [
        { text: 'Okay' },
      ]);
    } else if (data.password.length < 6) {
      Alert.alert('Thông báo', 'Mật khẩu phải nhiều hơn 6 ký tự', [
        { text: 'Okay' },
      ]);
    } else {
      try {
        auth()
          .createUserWithEmailAndPassword(data.userName, data.password)
          .then(() => {
            Alert.alert('Thành công!', 'Đăng ký thành công!', [
              {
                text: 'Okay',
                onPress: () => {
                  InserUserToTable();
                  navigation.goBack();
                },
              },
            ]);
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              Alert.alert('Thất bại!', 'Email đã được sử dụng!', [
                { text: 'Okay' },
              ]);
            }
            if (error.code === 'auth/invalid-email') {
              Alert.alert('Thất bại!', 'Email bạn nhập không hợp lệ!', [
                { text: 'Okay' },
              ]);
            }

            console.error(error);
          });
      } catch (error) {
        Alert.alert('Register fail!', error?.message, [{ text: 'Okay' }]);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header textHeader={'Create Post'} />
      <ScrollView>
      <View style={{ alignItems: 'center' }}>
        <View style={{ alignItems: 'center', height: 170, width: 170 }}>
          <Image
            source={require('../../../images/logo.jpg')}
            style={{ height: 170, width: 170 }}
            resizeMode="center"
          />
        </View>
      </View>
      <Text
        style={{
          marginTop: 20,
          marginLeft: 40,
          fontSize: 18,
          fontWeight: '700',
        }}>
        Name
      </Text>
      <View style={styles.viewInput}>
        <MaterialIcons
          name="subtitles"
          size={20}
          style={{ marginVertical: 12, marginHorizontal: 5 }}
        />
        <TextInput
          value={data?.name}
          placeholder="name"
          keyboardType="email-address"
          style={styles.textInput}
          onChangeText={txt => {
            setData({ ...data, name: txt });
          }}
        />
      </View>
      <Text
        style={{
          marginTop: 20,
          marginLeft: 40,
          fontSize: 18,
          fontWeight: '700',
        }}>
        Description
      </Text>
      <View style={styles.viewInput}>
        <Fontisto
          name="onenote"
          size={20}
          style={{ marginVertical: 12, marginHorizontal: 5 }}
        />
        <TextInput
          value={data?.userName}
          placeholder="Description"
          keyboardType="email-address"
          style={styles.textInput}
          onChangeText={txt => {
            setData({ ...data, userName: txt });
          }}
        />
      </View>
      <Text
        style={{
          marginTop: 20,
          marginLeft: 40,
          fontSize: 18,
          fontWeight: '700',
        }}>
        Time Start
      </Text>
      <View style={styles.viewInput}>
        <Ionicons
          name="time-outline"
          size={20}
          style={{ marginVertical: 12, marginHorizontal: 5 }}
        />
        <TextInput
          value={data?.password}
          placeholder="Time Start"
          style={styles.textInput}
          onChangeText={txt => setData({ ...data, password: txt })}
        />
      </View>
      <Text
        style={{
          marginTop: 20,
          marginLeft: 40,
          fontSize: 18,
          fontWeight: '700',
        }}>
        Time End
      </Text>
      <View style={styles.viewInput}>
        <Ionicons
          name="time-outline"
          size={20}
          style={{ marginVertical: 12, marginHorizontal: 5 }}
        />
        <TextInput
          value={data?.password}
          placeholder="Time End"
          style={styles.textInput}
          onChangeText={txt => setData({ ...data, password: txt })}
        />
      </View>
      <Text
        style={{
          marginTop: 20,
          marginLeft: 40,
          fontSize: 18,
          fontWeight: '700',
        }}>
        Address
      </Text>
      <View style={styles.viewInput}>
        <MaterialCommunityIcons
          name="map-marker"
          size={20}
          style={{ marginVertical: 12, marginHorizontal: 5 }}
        />
        <TextInput
          value={data?.password}
          placeholder="Address"
          style={styles.textInput}
          onChangeText={txt => setData({ ...data, password: txt })}
        />
      </View>
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity
          style={{
            height: 50,
            width: 150,
            backgroundColor:
              data?.name && data?.password && data?.role && data?.userName
                ? '#ff8000'
                : 'gray',
            marginTop: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 30,
          }}
          onPress={() => {
            onRegister();
          }}
          disabled={
            data?.name && data?.password && data?.role && data?.userName
              ? false
              : true
          }>
          <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#fff' }}>
            Create
          </Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  textInput: { textAlign: 'auto', fontSize: 18 },
  viewInput: {
    marginHorizontal: 40,
    marginTop: 10,
    borderWidth: 1,
    flexDirection: 'row',
    borderColor: '#FF8000',
    borderRadius: 8,
    alignItems: 'center'
  },
});


export default CreateRestaurant;
