import yesapi from '../../utils/YesApi/yesapi.js';
var WxParse = require('../../utils/wxParse/wxParse.js');

var app = getApp();
Page({
  data:{
  },
  onLoad: function (options) {
    var that = this;
    yesapi.requestAppWxmini_CmsGetArticleDetail(options.id, function (res) {
      var data = res.data;

      that.setData({
        news: data.article,
      })
      WxParse.wxParse('content', 'html', data.article.content, that, 25)
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
