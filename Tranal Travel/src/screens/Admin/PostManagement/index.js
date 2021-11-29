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
import { convertToNumberCommas } from '../../../../utilities/index';
import { CommonActions } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Input from '../../../components/Input';
import moment from 'moment';
const { width, height } = Dimensions.get('window');
import unAuthorizedRequest from '../../../services/api-service/unAuthorizedRequest';
import Header from '../../../components/Header/index';
const PostManagement = ({ navigation }) => {
  const [dataSearch, setDataSearch] = useState([]);
  const [dataPosts, setDataPosts] = useState([]);
  const [isShowLoading, setIsShowLoading] = useState(true);
  let timeout = useRef(null);
  const [textinput, setTextinput] = React.useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubcribe = navigation.addListener('focus', async () => {
      getData();
    });

    return unsubcribe;
  }, [navigation]);

  const getData = async () => {
    setIsShowLoading(true);
    setDataPosts(["1", "1", "3"]);
    setIsShowLoading(false);
  };

  const onHandleDellItem = async item => {
    const data = [...dataPosts];
    const dataDel = data.filter(item1 => item1?._id != item?._id);
    console.log('dataDel');
    const body = JSON.stringify({
      _id: item?._id,
    });
    setDataPosts(dataDel);
    console.log(body);
    const res = await unAuthorizedRequest.post('/posts/del', body);
    console.log(res);
  };

  const onSearch = text => {
    setIsLoading(true);
    let term = text;
    let AllProducts = [...dataPosts];
    let AllLocation = [...dataPosts];
    if (term && term.length >= 1 && AllProducts.length != 0) {
      if (timeout) clearTimeout(timeout);
      console.log('menu', AllProducts);
      timeout = setTimeout(() => {
        var menuData = AllProducts.filter(
          menuname1 => menuname1?.Name != undefined,
        );

        var menu = menuData.filter(menuname =>
          menuname?.Name.toLowerCase().includes(term.toLowerCase()),
        );
        var menuData1 = AllLocation.filter(
          menuname1 => menuname1?.Name != undefined,
        );
        console.log('menu', menuData);
        var menu1 = menuData1.filter(menuname =>
          menuname?.Location.toLowerCase().includes(term.toLowerCase()),
        );
        var dataAll = menu;
        menu1.map(item => {
          let count = 0;
          menu.map(item1 => {
            if (item1._id == item._id) {
              count = count + 1;
            }
          });
          if (count == 0) {
            dataAll.push(item);
          }
        });
        setDataSearch(dataAll);
        setIsLoading(false);
      }, 1000);
    }
  };

  // hiển thị các item trong flatlist (danh sách các bất động sản)
  const renderItemData = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => { }}
        style={styles.ViewWrap}>
        <View
          style={{
            width: width - 40,
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../../images/logoss.jpg')}
            resizeMode={'cover'}
          />
        </View>
        <View style={{ width: width - 40 }}>
          <Text
            style={[styles.TxtDes, { fontWeight: '900', fontSize: 16 }]}
            numberOfLines={2}>
            Nhà hàng Tuấn khỉ
          </Text>
          {/* <View style={styles.viewItemIcon}>
            <Ionicons
              name="ios-pricetags-outline"
              size={18}
              color={'#F27B13'}
            />
            <Text
              style={[
                styles.TxtDes,
                { color: '#F27B13', marginHorizontal: 6 },
              ]}>{`${convertToNumberCommas(item?.Price)}${'  VND'}`}</Text>
          </View> */}

          <View style={styles.viewItemIcon}>
            <Feather name="map-pin" size={18} color={'#F27B13'} />
            <Text style={[styles.TxtDes]}>Ngõ 7 Khuất Duy Tiến, quận Thanh Xuân </Text>
          </View>
          <View style={styles.viewItemIcon}>
            <Andesign name="appstore-o" size={18} color="#f27b13" />
            <Text style={[styles.TxtDes]}>Quán ăn </Text>
          </View>
          <View style={styles.viewItemIcon}>
            <Fontisto name="date" size={18} color={'#F27B13'} />
            <Text style={[styles.TxtDes]}>
              {moment().format('DD/MM/YYYY')}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.ViewCancel}
          onPress={() => { }}>
          <Icon1 name="close" size={20} color={'white'} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LoadingIndicator visible={isShowLoading} />
      <Header textHeader="List posts" />
      <View>
        {/* ViewHeader */}
        <View style={styles.ViewHeader}></View>
        {/* View Tìm kiếm  */}
        <LinearGradient
          colors={['#F27B13', 'transparent']}
          style={styles.ViewSearchContainer}>
          <View style={styles.ViewSearch}>
            <View style={{ height: 50 }}>
              <TextInput
                placeholder="Search"
                placeholderTextColor="#F27B13"
                style={styles.TxtTextInput}
                value={textinput}
                onChangeText={value => setTextinput(value)}
                onEndEditing={() => {
                  Keyboard.dismiss();
                  onSearch(textinput);
                }}
              />
            </View>
            <TouchableOpacity
              hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
              onPress={() => {
                Keyboard.dismiss();
                onSearch(textinput);
              }}>
              <Icon1 name="search1" size={22} color="#F27B13" />
            </TouchableOpacity>
            <TouchableOpacity
              hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
              style={{ marginLeft: 12 }}
              onPress={() => {
                navigation.navigate('EditPostsScreen', { data: {} });
              }}>
              <Icon1
                name="plussquareo"
                size={22}
                color="#F27B13"
              // style={{paddingBottom: 3}}
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <View style={{ height: 15 }} />

        {/* view the title of the products all */}
        {textinput.length <= 1 ? (
          dataPosts.length != 0 ? (
            <View
              style={{ marginBottom: 270, marginTop: 3, height: height - 100 }}>
              <FlatList
                data={dataPosts}
                renderItem={renderItemData}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          ) : (
            <Text
              style={{
                fontSize: 13,
                color: 'black',
                fontStyle: 'italic',
                alignSelf: 'center',
                marginTop: 12,
              }}>
              Empty list
            </Text>
          )
        ) : (
          <>
            <Text style={{ marginHorizontal: 16, marginVertical: 6 }}>
              Search results{' '}
            </Text>
            {isLoading ? (
              <ActivityIndicator size="large" color="#F27B13" />
            ) : (
              <View>
                {dataSearch.length != 0 ? (
                  <View style={{ marginBottom: 270, marginTop: 3 }}>
                    <FlatList
                      // horizontal
                      data={dataSearch}
                      renderItem={renderItemData}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </View>
                ) : (
                  <Text
                    style={{
                      fontSize: 13,
                      color: 'black',
                      fontStyle: 'italic',
                      alignSelf: 'center',
                      marginTop: 12,
                    }}>
                    Empty list
                  </Text>
                )}
              </View>
            )}
          </>
        )}

      </View>

    </SafeAreaView>
  );
};


export default PostManagement;
