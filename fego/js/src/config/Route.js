/**
 * 导航配置
 * Stack内嵌Tab
 */
import React from 'react';
import { View, Text } from 'react-native';
import { TabNavigator } from 'react-navigation';
import MainTabRoute from 'src/main/Route';
import UserRoute from 'src/user/Route';
import TestRoute from 'src/test/Route';
import TabOpt from './TabOpt';
import StackOpt from './StackOpt';

const TabNav = TabNavigator(MainTabRoute, TabOpt);
let _StackOpt = StackOpt;
// 启用开发配置
/* eslint no-undef: "off" */
if (__DEV__) {
  _StackOpt = {
    ...StackOpt,
    ...require('src/config.dev').default.StackOpt,
  };
}
export default {
  routeConf: {
    Root: {
      screen: TabNav,
      navigationOptions: {
        header: false,
        // header: (navigation) => {
        //   const { routeName } = navigation.state;
        //   if (routeName === 'Home') {
        //     return (
        //       <View style={{
        //         backgroundColor: '#db1531',
        //         width,
        //         height: Const.statusBarHeight + Const.headerNavHeight,
        //         alignItems: 'center',
        //         justifyContent: 'center',
        //       }}
        //       >
        //         <Text style={{
        //           marginTop: Platform.OS === 'ios' ? 20 : 0,
        //           fontSize: 16,
        //           fontWeight: 'bold',
        //           color: '#fff',
        //         }}
        //         >
        //           Welcome Fego
        //         </Text>
        //       </View >
        //     );
        //   } else if (routeName === 'Position') {
        //     return null;
        //   } else if (routeName === 'My') {
        //     return null;
        //   }
        // },
      },
    },
    ...UserRoute,
    ...TestRoute,
  },
  stackOpt: _StackOpt,
};

