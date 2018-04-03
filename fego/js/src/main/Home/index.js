import React from 'react';
import { View, Text, ListView, Image, TouchableHighlight, Platform, Dimensions } from 'react-native';
import { Carousel, RefreshView, Fetch, Loading, Toast, Tabs } from 'fego-rn';
import { Const, Page, AppNav } from 'common';

const { width } = Dimensions.get('window');
const boxW = width * 0.5 - 10;
const Styles = {
  header: {},
  rowItem: {
    flexDirection: 'row',
    height: boxW + 65,
  },
  productImg: {
    width: boxW,
    height: boxW,
  },
};

const TabStyles = {
  tabBar: {
    height: 50,
    backgroundColor: 'white',
  },
  text: {
    // fontSize: 30,
    fontWeight: 'bold',
  },
  tabBarItem: {
    backgroundColor: 'transparent',
  },
  activeUnderline: {
    backgroundColor: 'red',
    height: 3,
  },
};

const TabItems = [
  { type: '201', title: '精选' },
  { type: '1', title: '手机' },
  { type: '2', title: '家电' },
  { type: '3', title: '零食' },
  { type: '101', title: '艺术品' },
];

const ProductItem = ({ data }) => (
  <View style={{ margin: 5, backgroundColor: 'white' }}>
    <TouchableHighlight
      onPress={() => {
        AppNav.nav('test');
      }}
    >
      <Image
        resizeMode="stretch"
        source={{ uri: data.imgUrl }}
        style={Styles.productImg}
      />
    </TouchableHighlight>
    <Text style={{ fontSize: 16, marginHorizontal: 10 }}>{data.productName}</Text>
    <Text style={{ fontSize: 16, margin: 10, color: 'rgb(224, 58, 69)' }}>
      ¥{data.soldPrice}
    </Text>
  </View>
);

export default class TabHome extends Page {
  static navigationOptions = {
    header: (
      <View style={{
        backgroundColor: '#db1531',
        width,
        height: Const.statusBarHeight + Const.headerNavHeight,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      >
        <Text style={{
          marginTop: Platform.OS === 'ios' ? 20 : 0,
          fontSize: 16,
          fontWeight: 'bold',
          color: '#fff',
        }}
        >
          Welcome Fego
        </Text>
      </View >
    ),
  }

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.pageNo = 1;
    this.products = [];
    this.banners = [];
    const params = this.getParams(this.props);
    this.state = {
      requestType: (params && params.type) || this.props.type || '201',
      shouldShowHeader: false,
      carouselAutoPlay: true,
      bannerImgUrl: [],
      useLoadMore: false,
      dataSource: this.ds.cloneWithRows(this.products),
    };
  }

  componentDidMount() {
    Loading.start();
    this._onRefresh();
    this._requestBanner();
  }

  componentWillReceiveProps(nextProps) {
    const { params = {} } = nextProps.navigation.state;
    if (params.type) {
      const { type } = params;
      if (this.state.requestType !== type) {
        this._onRefresh(type);
      }
    }
  }

  onLeave() {
    if (this._carousel) {
      this.setState({
        carouselAutoPlay: false,
      });
    }
  }

  onEnter() {
    if (this._carousel) {
      this.setState({
        carouselAutoPlay: true,
      });
    }
  }

  _requestBanner() {
    Fetch.post('shop/getBannerList.html').then((res) => {
      const data = res.data || [];
      const result = data.result || [];
      this.banners = result;
      const imgUrls = [];
      for (let i = 0; i < result.length; i++) {
        imgUrls[i] = result[i].imgUrl;
      }
      this.setState({
        bannerImgUrl: imgUrls,
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  _requestResult(isPull, isOK, obj) {
    Loading.stop();
    if (isOK) {
      const data = obj.data || {};
      const result = data.result || [];
      const items = [];
      for (let i = 0; i < result.length; i += 2) {
        const item = [];
        item[0] = result[i];
        if (i + 1 < result.length) {
          item[1] = result[i + 1];
        }
        items.push(item);
      }
      this.setState({
        dataSource: this.ds.cloneWithRows(items),
      });
    } else {
      console.log(obj);
      // Toast.info(obj);
    }
    if (this.PullRefresh) {
      this.PullRefresh.refreshed();
    }
  }

  _requestResultWithPage(isPull, isOK, obj) {
    if (isOK) {
      console.log(obj);
      const { data } = obj;
      const { pageNo, totalPage, result } = data;
      if (isPull) {
        for (let i = 0; i < result.length; i++) {
          this.products[i] = result[i];
        }
        this.setState({
          dataSource: this.ds.cloneWithRows(this.products),
          useLoadMore: pageNo !== totalPage,
        });
        this.PullRefresh.refreshed();
      } else {
        this.products = this.products.concat(result);
        this.setState({
          dataSource: this.ds.cloneWithRows(this.products),
          useLoadMore: pageNo !== totalPage,
        });
        this.pageNo = this.pageNo + 1;
        if (this.pageNo >= totalPage) {
          this.pageNo = totalPage;
        }
        this.PullRefresh.loaded();
      }
    } else {
      console.log(obj);
    }
  }

  _onRefresh(type) {
    if (type && type !== this.state.requestType) {
      this.setState({
        requestType: type,
      });
    }
    type = type || this.state.requestType;
    Fetch.post('shop/getProductList.html', { type }).then((res) => {
      this._requestResult(true, true, res);
    }).catch((err) => {
      this._requestResult(true, false, err);
    });
  }

  _onLoadMore() {
    Fetch.post('shop/getProductList.html', { pageNo: this.pageNo }).then((res) => {
      this._requestResult(false, true, res);
    }).catch((err) => {
      this._requestResult(false, false, err);
    });
  }

  _onScroll(e) {
    const { y } = e.nativeEvent.contentOffset;
    // console.log(`==scroll===${y}`);
    let shouldShowHeader = false;
    if (y > this.baseTapPosY) {
      shouldShowHeader = true;
    }
    if (this.state.shouldShowHeader !== shouldShowHeader) {
      this.setState({
        shouldShowHeader,
      });
    }
  }

  _renderTabSelect() {
    const tabs = [];
    TabItems.forEach((item) => {
      tabs.push(<Tabs.TabPane title={item.title} key={item.type} />);
    });
    return (
      <Tabs
        onTabClick={(type, title) => {
          console.log('tab click, ', type, title);
          Loading.start();
          this._onRefresh(type);
        }}
        animated={false}
        swipeable={false}
        activeKey={this.state.requestType}
        styles={TabStyles}
        textColor="black"
        showUnderline
        activeTextColor="red"
        activeBgColor="white"
      >
        {tabs}
      </Tabs>
    );
  }

  _renderBase() {
    const { navigation } = this.props;
    return (
      <View>
        <Carousel
          ref={(c) => {
            this._carousel = c;
          }}
          interval={10000}
          autoPlay={this.state.carouselAutoPlay}
          source={this.state.bannerImgUrl}
          onPress={(pageIndex) => {
            const item = this.banners[pageIndex];
            navigation.navigate('web', { url: item && item.targetUrl });
          }}
        />
        <View
          style={{ marginTop: 5 }}
          onLayout={(e) => {
            this.baseTapPosY = e.nativeEvent.layout.y;
          }}
        >
          {this._renderTabSelect()}
        </View>
      </View >
    );
  }

  render() {
    const { shouldShowHeader } = this.state;
    let headerView;
    if (shouldShowHeader) {
      headerView =
        (
          <View style={{
            position: 'absolute',
          }}
          >
            {this._renderTabSelect()}
          </View>
        );
    }
    return (
      <View style={{ flex: 1 }}>
        <RefreshView
          ref={
            (c) => {
              this.PullRefresh = c;
            }
          }
          style={{ flex: 1 }}
          onScroll={e => this._onScroll(e)}
          onRefresh={() => this._onRefresh()}
          onLoadMore={() => this._onLoadMore()}
          useLoadMore={this.state.useLoadMore}
        >
          {this._renderBase()}
          <ListView
            style={{ flex: 1 }}
            scrollEventThrottle={16}
            enableEmptySections
            dataSource={this.state.dataSource}
            renderRow={
              (rowData) => {
                if (rowData.length === 2) {
                  return (
                    <View style={Styles.rowItem}>
                      <ProductItem data={rowData[0]} />
                      <ProductItem data={rowData[1]} />
                    </View>
                  );
                } else {
                  return (
                    <View style={Styles.rowItem}>
                      <ProductItem data={rowData[0]} />
                    </View>
                  );
                }
              }
            }
            removeClippedSubviews={false}
          />
        </RefreshView>
        {headerView}
      </View>
    );
  }

  renderOld() {
    return (
      <View style={{ flex: 1, backgroundColor: 'red' }} />
    )
  }
}
