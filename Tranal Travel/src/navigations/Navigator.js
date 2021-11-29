import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import ScreenItemPicker from '../components/PickerBase/screenItemPicker';
import LogIn from '../screens/LogIn/LogIn';
import Register from '../screens/LogIn/Register';
import Restaurant from '../screens/User/Restaurant';
import HomeAdmin from  '../screens/Admin/HomeAdmin';
import PostManagement from '../screens/Admin/PostManagement';
import UserManagement from '../screens/Admin/UserManagement';
import RegisterManagement from '../screens/Admin/RegisterManagement';
import HomeUser from '../screens/User/HomeUser';
import Hotel from '../screens/User/Hotel';
import HistoryUser from '../screens/User/HistoryUser';
import Setting from '../screens/Setting';
import HomeHotel from '../screens/ManagementHotel/HomeHotel';
import ListHotel from '../screens/ManagementHotel/ListHotel';
import CreateHotel from '../screens/ManagementHotel/CreateHotel';
import HistoryHotel from '../screens/ManagementHotel/HistoryHotel';
import CreateRestaurant from '../screens/ManagementHotel/CreateRestaurant';
const Stack = createStackNavigator();
const screenOptionStyle = {
  headerShown: false,
};

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="HomeUser" component={HomeUser} />
      <Stack.Screen name="Restaurant" component={Restaurant} />
      <Stack.Screen name="HomeAdmin" component={HomeAdmin} />
      <Stack.Screen name="PostManagement" component={PostManagement} />
      <Stack.Screen name="UserManagement" component={UserManagement} />
      <Stack.Screen name="RegisterManagement" component={RegisterManagement} />
      <Stack.Screen name="Hotel" component={Hotel} />
      <Stack.Screen name="HistoryUser" component={HistoryUser} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="HomeHotel" component={HomeHotel} />
      <Stack.Screen name="ListHotel" component={ListHotel} />
      <Stack.Screen name="CreateHotel" component={CreateHotel} />
      <Stack.Screen name="HistoryHotel" component={HistoryHotel} />
      <Stack.Screen name="CreateRestaurant" component={CreateRestaurant} />
      <Stack.Screen
        name="ScreenItemPicker"
        component={ScreenItemPicker}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
