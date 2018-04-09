import { AsyncStorage } from 'react-native';
import AppNav from './AppNav';

const KEY_USER_INFO = 'KEY_USER_INFO';
export default {
  isLogin: false,
  userName: '',
  getCacheUserInfo: (callback) => {
    AsyncStorage.getItem(KEY_USER_INFO).then((value) => {
      const jsonValue = JSON.parse(value);
      callback(jsonValue);
    });
  },
  login: (data) => {
    this.isLogin = true;
    this.userName = data;
    const value = {
      userName: data,
    };
    AsyncStorage.setItem(KEY_USER_INFO, JSON.stringify(value));
  },
  loginOut: () => {
    const data = {
      userName: this.userName,
    };
    this.userName = '';
    this.isLogin = false;
    AsyncStorage.setItem(KEY_USER_INFO, JSON.stringify(data));
    AppNav.nav('user/Login');
  },
};
