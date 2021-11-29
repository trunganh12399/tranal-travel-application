import {Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
    // justifyContent:'center'
  },
  buttonChoose:{
    width: width/2-30,
    height: width / 2 - 30, borderRadius: 10, backgroundColor:'rgba(255, 128, 0,0.8)',
    justifyContent:'center',
    alignItems:'center',
    marginHorizontal: 15,
  }, txtTitle:{
    color:'white', fontSize:20, fontWeight:'900', alignSelf:'center'
  }
});
