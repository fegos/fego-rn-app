import React from 'react';
import { AppRegistry } from 'react-native';
import { AppContainer } from 'fego-rn';

const App = (props) => {
  // 更新AppInfo后，再加载src下的模块
  const AppInfo = require('./app/AppInfo').default;
  AppInfo.init(props);
  const AppSetContainer = AppContainer.setApp(require('./app').default);
  // 确保AppInfo的信息正确
  return <AppSetContainer />;
};
AppRegistry.registerComponent('fego', () => App);
