var WxParse = require('../../utils/wxParse/wxParse.js');

var app = getApp();
Page({
  data:{
  },
  onLoad: function (options) {
    console.log('onLoad222');
    var that = this;
    wx.request({
      url: CONFIG.API_URL.GET_INDEX + "&s=App.Market_LastestNews.Detail&id=" + options.id,
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        console.log(res);

        if (res.statusCode == 200 && res.data.ret == 200) {        
          var data = res.data;

console.log(data)
          that.setData({
            news: data.data.detail,
          })
          WxParse.wxParse('content', 'html', data.data.detail.news_content, that, 25)
        } else {
          
        }
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})
