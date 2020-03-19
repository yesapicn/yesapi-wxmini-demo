import yesapi from '../../utils/YesApi/yesapi.js';

//获取应用实例
const app = getApp()

Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    swipers: [],
    news: [],
    cat: '17',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    channel: [
      {
        target: "/pages/index/index",
        iconUrl: "/images/menu/shouji.png",
        name: "小白免费API"
      },
      {
        target: "/pages/index/index",
        iconUrl: "/images/menu/shujubaobiao.png",
        name: "小白开放平台"
      },
      {
        target: "/pages/index/index",
        iconUrl: "/images/menu/xiangmu.png",
        name: "数据存储"
      },
      {
        target: "/pages/index/index",
        iconUrl: "/images/menu/tupian.png",
        name: "图片存储"
      },
      {
        target: "/pages/index/index",
        iconUrl: "/images/menu/yonghu.png",
        name: "会员体系"
      },
      {
        target: "/pages/index/index",
        iconUrl: "/images/menu/gongwenbao.png",
        name: "SaaS服务"
      },
      {
        target: "/pages/index/index",
        iconUrl: "/images/menu/xinxing.png",
        name: "定制开发"
      },
      {
        target: "/pages/index/index",
        iconUrl: "/images/menu/shouji.png",
        name: "小程序开发"
      }
    ]
  },

  onLoad: function () {
    var that = this;

    yesapi.requestAppHelloWorld('Demo', function(res) {
      console.log('如果你看到这句话，说明小白接口请求成功啦~', res)
    }, function (res) {
      console.log('小白接口配置不正确，修改app.js配置文件：', res)
    })

    // 登录
    this.goGetUserInfo()

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
