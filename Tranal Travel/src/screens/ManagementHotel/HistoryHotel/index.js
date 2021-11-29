import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  SafeAreaView,
  FlatList,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  ActivityIndicator,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import styles from './styles';
import LoadingIndicator from '../../../components/Loading';
import {convertToNumberCommas} from '../../../utilities/index';
import {CommonActions} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Input from '../../../components/Input';
import moment from 'moment';
const {width, height} = Dimensions.get('window');
import unAuthorizedRequest from '../../../services/api-service/unAuthorizedRequest';
import Header from '../../../components/Header/index';
const HistoryHotel = ({navigation}) => {
  const [isShowLoading, setIsShowLoading] = useState(false);
  const [listManagement, setListManagement] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      setIsShowLoading(true);
      const users = await firestore().collection('users').get();
      let allUser = users.docs.map(doc => doc.data());
      let userManagement = allUser.filter(
        item => item?.role != 'Admin' && item?.role !== 'User',
      );
      console.log('users_users', userManagement);
      setListManagement(userManagement);
      setIsShowLoading(false);
    };
    getUser();
  }, []);

  const renderItemManagement = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          borderRadius: 8,
          backgroundColor: 'white',
          width: width - 20,
          alignSelf: 'center',
          justifyContent: 'center',
          padding: 20,
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 18,
            fontWeight: '700',
            lineHeight: 30,
          }}>
          {"Buffe hải sản 3"}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 8,
          }}>
          <Ionicons name="time-outline" color="grey" size={20} />
          <Text
            style={{
              color: 'gray',
              fontSize: 14,
              fontWeight: '500',
              marginLeft: 6,
            }}>
            {"29/11/2021 10:40"}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Ionicons name="person-sharp" color="grey" size={20} />
          <Text
            style={{
              color: 'gray',
              fontSize: 14,
              fontWeight: '500',
              marginLeft: 12,
            }}>
            {"Nguyễn văn A"}
          </Text>
        </View>
        <TouchableOpacity style={{ position: 'absolute', top: 3, right: 3 }}><AntDesign name="closecircle" color="red" size={30} /></TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LoadingIndicator visible={isShowLoading} />
      <Header
        textHeader={'History'}
      />
      <View style={{flex: 1, marginVertical: 6}}>
        <FlatList
          data={listManagement}
          renderItem={renderItemManagement}
          extraData={listManagement}
        />
      </View>
    </SafeAreaView>
  );
};
export default HistoryHotel;
