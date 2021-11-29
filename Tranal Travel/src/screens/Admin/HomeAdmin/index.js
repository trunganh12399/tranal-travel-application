import React, { useState, useRef, useEffect } from 'react';
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
import Icon1 from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Andesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import styles from './styles';
import LoadingIndicator from '../../../components/Loading';
import { convertToNumberCommas } from '../../../utilities/index';
import { CommonActions } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Input from '../../../components/Input';
import moment from 'moment';
const { width, height } = Dimensions.get('window');
import unAuthorizedRequest from '../../../services/api-service/unAuthorizedRequest';
const HomeAdmin = ({ navigation }) => {
  const [isShowLoading, setIsShowLoading] = useState(false);




  return (
    <SafeAreaView style={styles.container}>
      <LoadingIndicator visible={isShowLoading} />
      <View style={{ alignItems: 'center' }}>
        <View style={{ alignItems: 'center', height: 250, width: 250 }}>
          <Image
            source={require('../../../images/logo.jpg')}
            style={{ height: 250, width: 250 }}
            resizeMode="center"
          />
        </View>
      </View>
<View style={{alignSelf:'center', flexDirection:'row', marginTop: 100}}>
        <TouchableOpacity onPress={() => navigation.navigate("PostManagement")}
         style={styles.buttonChoose}>
          <Text style={styles.txtTitle}>Manage Posts</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("UserManagement")}
        style={styles.buttonChoose}>
          <Text style={styles.txtTitle}>Account Management</Text></TouchableOpacity>
</View>
    </SafeAreaView>
  );
};
export default HomeAdmin;
