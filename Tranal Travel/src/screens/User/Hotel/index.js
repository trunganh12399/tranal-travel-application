import React, { useState } from 'react';
import {
    FlatList,
    SafeAreaView,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { View, Image, Text } from 'react-native-animatable';
import HeaderShowNavigation from '../../../components/Header';
import Header from '../../../components/Header/index';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Hotel = ({ navigation }) => {
    const [itemm, setItemm] = useState(0);
    var dataMenu = [
        {
            title: 'Nhà nghỉ Hà nội',
            images: require('../../../images/unnamed.jpg'),
            money: 'Hà nội',
            number: '40.000',
        },
        {
            title: 'Nhà nghỉ Hà nội',
            images: require('../../../images/unnamed.jpg'),
            money: 'Hà nội',
            number: '40.000',
        },
        {
            title: 'Nhà nghỉ Hà nội',
            images: require('../../../images/unnamed.jpg'),
            money: 'Hà nội',
            number: '40.000',
        },
        {
            title: 'Nhà nghỉ Hà nội',
            images: require('../../../images/unnamed.jpg'),
            money: 'Hà nội',
            number: '40.000',
        },
        {
            title: 'Nhà nghỉ Hà nội',
            images: require('../../../images/unnamed.jpg'),
            money: 'Hà nội',
            number: '40.000',
        },
    ];

    const buyItem = value => {
        setItemm(itemm + 1);
    };
    const renderItem = ({ item, index }) => {
        return (
  
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' ,backgroundColor:'white', borderBottomWidth: 0.5, paddingBottom: 5 }}>
                    <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 20 }}>
                        <Image
                            source={item.images}
                            style={{ height: 120, width: 150, borderRadius: 20 }}
                        />
                        <View>
                            <Text style={{ marginTop: 0, marginLeft: 20, color: "#ff8000" }}>{item.title} </Text>
                            <View style={{ flexDirection: "row", marginTop: 10, marginLeft: 20 }} >
                            <Text  >Price :</Text>
                                <Text style={{ color: "#ff8000" }} > {item.number} </Text>
                            </View>
                            <View style={{ flexDirection: "row", marginTop: 10, marginLeft: 20 }} >
                                <Text  >Address :</Text>
                                <Text style={{ color: "#ff8000" }} > {item.money} </Text>
                            </View>
                            {/* <Text style={{ marginTop: 10, marginLeft: 20 }}> Giá : {item.money} </Text>
                            <Text style={{ marginTop: 10, marginLeft: 20 }}> Thời gian trống : 5h30 </Text> */}
                        </View>
                    </View>
                    <TouchableOpacity
                        style={{ marginRight: 20, marginTop: 40 }}
                        onPress={() => {
                            buyItem;
                        }}>
                        <Octicons name="diff-added" size={18} color="#ff8000" />
                    </TouchableOpacity>
                </View>
    
        );
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor:'white' }}>
            {/* Header */}
            <Header textHeader="Hotel" />
            <View style={{ alignItems: 'center', borderWidth: 0.5,  }}>
                <View style={{ alignItems: 'center', height: 150, width: 150 }}>
                    <Image
                        source={require('../../../images/logo.jpg')}
                        style={{ height: 200, width: 200 }}
                        resizeMode="center"
                    />
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text
                    style={{
                        fontSize: 20,
                        color: '#ff8000',
                        marginLeft: 20,
                        marginTop: 50,
                    }}>
                    ____Menu____{' '}
                </Text>
            </View>

            <ScrollView style={{ marginTop: 20, borderTopWidth: 0.5}}>
                <FlatList
                    data={dataMenu}
                    renderItem={renderItem}
                />
            </ScrollView>
        </SafeAreaView>
    );
};
export default Hotel;
