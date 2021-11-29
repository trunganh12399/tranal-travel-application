import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  Alert,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import LoadingIndicator from '../../components/Loading';
const {height, width} = Dimensions.get('screen');
const LogIn = ({ navigation, route}) => {
  const {data1} = route?.params;
  const [data, setData] = React.useState({
    username: 'admin@gmail.com',
    password: 'admin123',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });
  const [loading, setLoading] = useState(false);
  const [firstLoading, setFirstLoading] = useState(false);

  const isEmail = value => {
    // eslint-disable-next-line no-useless-escape
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !!regex.test(String(value).toLowerCase());
  };
  const textInputChange = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: isEmail(val),
        isValidUser: isEmail(val),
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: isEmail(val),
        isValidUser: isEmail(val),
      });
    }
  };

  const handlePasswordChange = val => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: isEmail(val),
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const loginHandle = async () => {
    // navigation.navigate('SignUpScreen')
    const {username, password} = data;
    if (data.username.length === 0 || data.password.length === 0) {
      Alert.alert(
        'Wrong Input!',
        'Username or password field cannot be empty.',
        [{text: 'Okay'}],
      );
      return;
    } else {
      setLoading(true);
      await auth()
        .signInWithEmailAndPassword(username, password)
        .then(async function (result) {
       
          let body = {
            username: username,
            password: password,
          };
          setLoading(false);
          navigation.navigate('HomeHotel');
          // result.user.tenantId should be ‘TENANT_PROJECT_ID’.
        })
        .catch(function (error) {
          setLoading(false);

          if (error.code === 'auth/invalid-email') {
            Alert.alert('Thất bại!', 'Email bạn nhập không hợp lệ!', [
              {text: 'Okay'},
            ]);
          } else {
            if (error.code === 'auth/wrong-password') {
              Alert.alert(
                'Thông báo!',
                'Thông tin email hoặc password không chính xác!',
                [{text: 'Okay'}],
              );
            } else {
              Alert.alert(
                'Thông báo!',
                'Đăng nhập thất bại! Vui lòng thử lại!',
                [{text: 'Okay'}],
              );
            }
          }
          console.log(error);
        });
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
          <LoadingIndicator visible={loading}/>
      <View style={{alignItems: 'center'}}>
        <View style={{alignItems: 'center', height: 150, width: 150}}>
          <Image
            source={require('../../images/logo.jpg')}
            style={{height: 250, width: 250}}
            resizeMode="center"
          />
        </View>
      </View>

      <Text
        style={{
          marginTop: 130,
          marginLeft: 40,
          fontSize: 18,
          color: '#ff8000',
        }}>
        {' '}
        Login to your account{' '}
      </Text>
      <Text
        style={{
          marginTop: 20,
          marginLeft: 40,
          fontSize: 18,
          fontWeight: '700',
        }}>
        UserName
      </Text>
      <View
        style={[
          styles.viewInput,
          {borderColor: !data.isValidUser ? 'red' : 'gray'},
        ]}>
        <Entypo
          name="user"
          size={20}
          style={{marginVertical: 12, marginHorizontal: 5}}
        />
        <TextInput
        value ={data?.username}
          placeholder="UserName"
          style={styles.textInput}
          onChangeText={txt => {
            textInputChange(txt);
          }}
          onEndEditing={e => handleValidUser(e.nativeEvent.text)}
        />
        {data.check_textInputChange ? (
          <Animatable.View animation="bounceIn">
            <Feather name="check-circle" color="green" size={20} />
          </Animatable.View>
        ) : null}
      </View>
      <Text
        style={{
          marginTop: 20,
          marginLeft: 40,
          fontSize: 18,
          fontWeight: '700',
        }}>
        Password
      </Text>
      <View
        style={[
          styles.viewInput,
          {borderColor: !data.isValidPassword ? 'red' : 'gray'},
        ]}>
        <MaterialCommunityIcons
          name="key-variant"
          size={22}
          style={{marginVertical: 12, marginHorizontal: 5}}
        />
        <TextInput
          value={data?.password}
          placeholder="Password"
          style={styles.textInput}
          onChangeText={txt => handlePasswordChange(txt)}
          secureTextEntry={data.secureTextEntry}
        />
        <TouchableOpacity onPress={updateSecureTextEntry}>
          {data.secureTextEntry ? (
            <Feather name="eye-off" color="grey" size={20} />
          ) : (
            <Feather name="eye" color="grey" size={20} />
          )}
        </TouchableOpacity>
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            height: 50,
            width: 150,
            backgroundColor:
              data?.password && data?.username ? '#ff8000' : 'gray',
            marginTop: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 30,
          }}
          onPress={() => {
            loginHandle();
          }}
          disabled={data?.password && data?.username ? false : true}>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: '#fff'}}>
            LogIn
          </Text>
        </TouchableOpacity>
      </View>
      {data1&&
      <View style={{flexDirection: 'row', marginTop: 20, marginLeft: 40}}>
        <Text>Do not have an account ? {''}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Register');
          }}>
          <Text style={{ fontSize: 14, color: '#FF8000' }}>Register</Text>
        </TouchableOpacity>
      </View>}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  textInput: {textAlign: 'auto', fontSize: 18, height: 50, width: width - 150},
  viewInput: {
    marginHorizontal: 40,
    marginTop: 10,
    borderWidth: 1,
    flexDirection: 'row',
    borderColor: 'gray',
    borderRadius: 8,
    alignItems: 'center',
  },
});
export default LogIn;
