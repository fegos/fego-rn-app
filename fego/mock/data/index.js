module.exports = {
  'shop/getBannerList.html': {
    delay: 1000,
    response() {
      const result = [];
      for (let i = 0; i < 4; i++) {
        if (i % 2 === 0) {
          result[i] = {
            imgUrl: 'https://media.giphy.com/media/13WZniThXy0hSE/giphy.gif',
            targetUrl: 'https://www.baidu.com',
          };
        } else {
          result[i] = {
            imgUrl: 'https://www.baidu.com/img/bd_logo1.png',
            targetUrl: 'https://www.baidu.com',
          };
        }
      }
      return {
        retcode: 100,
        retdesc: '服务器撒娇了',
        data: {
          result,
        },
      };
    },
  },
  'shop/getProductList.html': {
    delay: 1000,
    response(req) {
      const type = parseInt(req.body.type, 10);
      console.log(type);
      const result = [];
      for (let i = 0; i < 10; i++) {
        result[i] = {
          productId: '@id',
          productName: '@ctitle(3, 5)',
          platform: '',
          'productType|1': [1, 2, 3, 101, 201],
          productCount: /\d{2,4}/,
          productUnit: '',
          productDesc: 'https://www.baidu.com/img/bd_logo1.png,https://www.baidu.com/img/bd_logo1.png',
          imgUrl: 'https://www.baidu.com/img/bd_logo1.png',
          bannerImgUrl: 'https://www.baidu.com/img/bd_logo1.png,https://www.baidu.com/img/bd_logo1.png',
          soldPrice: 8999,
          rmbFacePrice: 8999,
          currencyType: 8888,
          soldCount: 1000,
          point: 0,
          isSpecial: i % 2 === 0,
        };
      }
      console.log(result);
      return {
        retcode: 100,
        retdesc: '成功',
        data: {
          type,
          totalPage: 3,
          result,
        },
      };
    },
  },
};
