import React, {Component} from 'react';
const convertToNumberCommas = val => {
  if (val == null || val == undefined || val == '') return '0';
  const num = Number(val)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  if (Number.isNaN(num)) return val;
  return num.toLocaleString('ja-JP');
};
function validate(evt) {
  if(evt){
   const StringNumber = evt.replace(/[^0-9]/g, "");
    return StringNumber.toString();
  }else return"";

}
const isEmail = (value) => {
  // eslint-disable-next-line no-useless-escape
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !!regex.test(String(value).toLowerCase());
};

export { convertToNumberCommas, validate, isEmail};

// https://stackoverflow.com/questions/33628677/react-native-responsive-font-size
