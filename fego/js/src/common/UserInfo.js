import { AppNav } from 'common';

export default {
  isLogin: false,
  login: () => {
    this.isLogin = true;
  },
  loginOut: () => {
    this.isLogin = false;
    AppNav.nav('user/Login');
  },
};
