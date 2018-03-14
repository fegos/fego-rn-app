import { View, Text, StyleSheet, Dimensions, Image, TouchableHighlight } from 'react-native';
import { Page, AppNav } from 'common';
import React from 'react';

import { RefreshView } from 'fego-rn';

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
});

export default class Home extends Page {
  onRefresh(PullRefresh) {
    console.log('refresh');
    setTimeout(() => {
      PullRefresh.refreshed();
    }, 1500);
  }

  renderListItem = (img, title, subtitle, routeURL, isLast) => {
    const borderBottomColor = isLast ? 'transparent' : '#b3b3b3';
    const borderBottomWidth = isLast ? 0 : StyleSheet.hairlineWidth;
    return (
      <TouchableHighlight onPress={() => {
          // AppNav.nav(routeURL);
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
              <Text style={{ marginRight: 5 }}>{subtitle}</Text>
              <Text style={{ marginRight: 16 }}> {'>'} </Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  renderEmptyItem = () => (
    <View style={{ height: 14, width }} />
  )

  render() {
    return (
      <View style={styles.container} >
        <RefreshView onRefresh={PullRefresh => this.onRefresh(PullRefresh)}>
          {
            // userinfo
          }
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
              <Image source={require('./my-icon.jpeg')} style={{ width: 50, height: 50, borderRadius: 5 }} />
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
          {
            // list item
          }
          <View style={styles.list} >
            { this.renderListItem(require('./1.jpg'), '账单', '1', 'Position', true) }
            { this.renderEmptyItem() }
            { this.renderListItem(require('./1.jpg'), '账单', '2', 'Position', false) }
            { this.renderListItem(require('./1.jpg'), '账单', '3', 'Position', false) }
            { this.renderListItem(require('./1.jpg'), '账单', '4', 'Position', false) }
            { this.renderListItem(require('./1.jpg'), '账单', '', 'Position', true) }
          </View>

        </RefreshView>
      </View>
    );
  }
}
