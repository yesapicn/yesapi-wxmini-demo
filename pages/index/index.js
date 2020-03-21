import yesapi from '../../utils/YesApi/yesapi.js';

//获取应用实例
const app = getApp()

Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    swipers: [{
      id: 0,
      adver_image: 'http://cdn7.okayapi.com/yesyesapi_20191022182350_ee3b14448d62aae9736ebd0050dee1cd.png',
      adver_url: '',
    }],
    notice_title: '优惠服务热线：1388888888',
    news: [
      {
        id: 1,
        title: "果创云商城上线啦！",
        "image": "http://cd7.yesapi.net/F9B20374B4CBD344913900A437BA56A2_20200225230943_f56800c6c233a1e4645da6d76ec9a730.png",
        zhaiyao: "轻松开店，在线当老板！"
      }
    ],
    cat: '17',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    menus: [
      {
        jump_url: "/pages/index/index",
        menu_icon: "/images/menu/shouji.png",
        menu_title: "小白免费API"
      },
      {
        jump_url: "/pages/index/index",
        menu_icon: "/images/menu/shujubaobiao.png",
        menu_title: "小白开放平台"
      },
      {
        jump_url: "/pages/index/index",
        menu_icon: "/images/menu/xiangmu.png",
        menu_title: "数据存储"
      }
    ]
  },

  onLoad: function () {
    var that = this;

    // 轮播图
    yesapi.requestAppWxmini_AdverGetAdList(10, function (res) {
        that.setData({swipers: res.data.items})
    })

    // 公告
    yesapi.requestAppWxmini_NoticeGetList(1, function (res) {
      that.setData({ notice_title: res.data.items[0]['notice_title'] })
    })

    // 菜单
    yesapi.requestAppWxmini_MenusGetList(10, function(res) {
      that.setData({ menus: res.data.items})
    })

    // 最新动态
    yesapi.requestAppWxmini_CmsGetArticleList(null, 1, 3, function (res) {
      that.setData({ news: res.data.items })
    })

    // 测试
    yesapi.requestAppHelloWorld('Demo', function(res) {
      console.log('如果你看到这句话，说明小白接口请求成功啦~', res)
    }, function (res) {
      console.log('小白接口配置不正确，修改app.js配置文件：', res)
    })

    // 上传图片
    // this.chooseImageAndUpload()

    // 上传文件
    // this.chooseFileAndUpload()

    // 登录
    this.goGetUserInfo()

  },
  chooseImageAndUpload: function () {
    wx.chooseImage({
      count: 1,
      success: function (res) {
        yesapi.requestAppCDNUploadImg(res.tempFilePaths[0], function (res) {
          console.log('图片上传完毕：', res);
        })
      }
    })
  },

  chooseFileAndUpload: function () {
    wx.chooseMessageFile({
      count: 1,
      success: function (res) {
        console.log('选择的文件：', res)
        yesapi.requestAppCDNUploadOffice(res.tempFiles[0].path, function (res) {
          console.log('文件上传完毕：', res);
        })
      }
    })
  },
  onShareAppMessage: function () {
   // return custom share data when user share.
   console.log('onShareAppMessage')
   return {
      title: '广州果创网络科技有限公司',
      desc: '小程序',
      path: '/pages/index/index'
    }
  },
  onLogin: function (iv, encryptedData) {
    wx.login({ //重新登录
      success(res) {
        if (res.code) {
          //发起网络请求
          //console.log('开始登录', res.code, iv, encryptedData)

          yesapi.requestAppWxmini_UserLogin(res.code, iv, encryptedData, function (res) {
            console.log('微信用户登录：', res)
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  goGetUserInfo: function() {
    var that = this

    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              //wx.setStorageSync('encryptedData', res.encryptedData)
              //wx.setStorageSync('iv', res.iv)
              wx.setStorageSync('userInfo', res.userInfo)

              // 存全局
              app.globalData.userInfo = res.userInfo
              app.globalData.openid = res.userInfo.openid

              that.onLogin(res.iv, res.encryptedData)
            }
          })
        } else {
          wx.authorize({
            scope: 'scope.userInfo', // 授权用户信息

            // 如果你是封装是用户授权也行 拒绝了也可以弹起
            success: res => {
              wx.getUserInfo({
                success: res => {
                  console.log(res)
                }
              });
            },
            fail: () => {
              console.log('打开权限失败')
            }
          })
        }
      }
    });
  }
});
