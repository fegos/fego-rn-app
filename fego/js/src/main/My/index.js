import {
  View, Text, StyleSheet, Dimensions, Image,
  TouchableHighlight, FlatList, Alert,
} from 'react-native';
import { Page, AppNav } from 'common';
import React from 'react';

import { RefreshView } from 'fego-rn';
import ImagePicker from 'react-native-image-crop-picker';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#0066ff',
  },
  header: {
    backgroundColor: '#0066ff',
    width,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  list: {
    flex: 1,
    backgroundColor: '#d9d9d9',
    width,
    height: height - 150,
  },
  listItem: {
    width,
    height: 38,
    paddingLeft: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    flexDirection: 'row',
  },
  modalContainer: {
    paddingTop: 20,
    flex: 1,
  },
  scrollView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});

export default class Home extends Page {
  constructor(props) {
    super(props);
    this.data = [
      {
        id: '蚂蚁会员',
        img: require('./1.jpg'),
        title: '蚂蚁会员',
        rightItem: {
          item:
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Text style={{ fontSize: 12, color: 'gray' }} > 提现服务免费限时兑换 </Text>
    <View style={{
          width: 4, height: 4, borderRadius: 4, backgroundColor: 'red',
          }}
    />
  </View>,
        },
        routeURL: 'Position',
        isLast: false,
        render: true,
      },
      {
        id: '蚂蚁会员-', render: false,
      },
      {
        id: '账单', img: require('./3.jpg'), title: '账单', routeURL: 'Position', isLast: false, render: true,
      },
      {
        id: '总资产', img: require('./4.jpg'), title: '总资产', rightItem: { item: <Text style={{ fontSize: 12, color: 'green' }}> 账户资产保障中</Text> }, routeURL: 'Position', isLast: false, render: true,
      },
      {
        id: '余额', img: require('./5.jpg'), title: '余额', rightItem: { item: <Text style={{ fontSize: 12, color: 'gray' }}> 100000.00元 </Text> }, routeURL: 'Position', isLast: false, render: true,
      },
      {
        id: '余额宝', img: require('./6.jpg'), title: '余额宝', routeURL: 'Position', isLast: false, render: true,
      },
      {
        id: '银行卡', img: require('./1.jpg'), title: '银行卡', routeURL: 'Position', isLast: true, render: true,
      },
      {
        id: '银行卡-', render: false,
      },
      {
        id: '蚂蚁财富', img: require('./3.jpg'), title: '蚂蚁财富', routeURL: 'Position', isLast: false, render: true,
      },
      {
        id: '芝麻信用', img: require('./4.jpg'), title: '芝麻信用', routeURL: 'Position', isLast: false, render: true,
      },
      {
        id: '保险服务', img: require('./5.jpg'), title: '保险服务', routeURL: 'Position', isLast: false, render: true,
      },
      {
        id: '花呗', img: require('./6.jpg'), title: '花呗', routeURL: 'Position', isLast: false, render: true,
      },
      {
        id: '蚂蚁借呗', img: require('./1.jpg'), title: '蚂蚁借呗', routeURL: 'Position', isLast: false, render: true,
      },
      {
        id: '网商银行', img: require('./2.jpg'), title: '网商银行', routeURL: 'Position', isLast: true, render: true,
      },
      {
        id: '网商银行-', render: false,
      },
      {
        id: '公益', img: require('./4.jpg'), title: '公益', routeURL: 'Position', isLast: false, render: true,
      },
      {
        id: '娱乐宝', img: require('./5.jpg'), title: '娱乐宝', routeURL: 'Position', isLast: true, render: true,
      },
    ];
    this.state = {
      selected: new Map(), avater: require('./my-icon.jpeg'),
    };
  }

  onRefresh(PullRefresh) {
    console.log('refresh');
    setTimeout(() => {
      PullRefresh.refreshed();
    }, 1500);
  }

  renderListItem = (img, title, routeURL, rightItem, isLast) => {
    const borderBottomColor = isLast ? 'transparent' : '#b3b3b3';
    const borderBottomWidth = isLast ? 0 : StyleSheet.hairlineWidth;
    return (
      <TouchableHighlight onPress={() => {
          AppNav.nav(routeURL);
        }}
      >
        <View style={styles.listItem}>
          <Image source={img} style={{ width: 25, height: 25, borderRadius: 5 }} />
          <View style={{
              flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 10, borderBottomColor, height: 38, borderBottomWidth,
              }}
          >
            <Text style={{ flex: 1, textAlign: 'left' }}>{title}</Text>
            <View style={{
              flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end',
              }}
            >
              { rightItem ? rightItem.item : null }

              <Text style={{ marginRight: 16, width: 14 }}> { '>' } </Text>

            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  renderEmptyItem = () => (
    <View style={{ height: 14, width }} />
  )

  _renderItem = ({ item }) => {
    if (item.render) {
      const {
        img, title, rightItem, routeURL, isLast,
      } = item;
      return this.renderListItem(img, title, routeURL, rightItem, isLast);
    } else {
      return this.renderEmptyItem();
    }
  }

  _changeAvater=() => {
    ImagePicker.openPicker({
      cropping: true,
    }).then((image) => {
      this.setState({ avater: { uri: image.sourceURL } });
    }).catch((e) => {
      Alert.alert(e.message ? e.message : e);
    });
  }

  _keyExtractor = item => item.id;

  render() {
    return (
      <View style={styles.container} >
        <RefreshView onRefresh={PullRefresh => this.onRefresh(PullRefresh)}>
          { /* userinfo */ }
          <View style={styles.header}>
            <View style={styles.userInfo} >
              <Text style={{ flex: 1 }} />
              <Text style={{
                    flex: 1,
                    textAlign: 'center',
                    color: '#ffffff',
                    fontSize: 20,
                    fontWeight: '300',
                    }}
              >我的
              </Text>
              <Text style={{
                    flex: 1, textAlign: 'right', color: '#f0f0f0', fontSize: 12,
                    }}
              >设置
              </Text>
            </View>
            <View style={styles.userInfo}>
              <TouchableHighlight onPress={this._changeAvater}>
                <Image source={this.state.avater} style={{ width: 50, height: 50, borderRadius: 5 }} />
              </TouchableHighlight>
              <View style={{ marginLeft: 10, justifyContent: 'space-between' }}>
                <Text style={{ color: '#ffffff' }}>Fego-app</Text>
                <View style={{ height: 10 }} />
                <Text style={{ color: '#f0f8ff' }}>fego大前端</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Image source={require('./setting.jpg')} style={{ width: 20, height: 20, borderRadius: 2 }} />
              </View>
            </View>
          </View>
          {/* list */}
          <View style={styles.list} >
            <FlatList
              data={this.data}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
            />
          </View>
        </RefreshView>
      </View>
    );
  }
}
