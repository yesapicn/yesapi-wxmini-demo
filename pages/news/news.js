import yesapi from '../../utils/YesApi/yesapi.js';

Page({
  data:{
    page: 1,
    perpage: 100
    
  },
  onLoad: function () {
    var that = this;
    // 最新动态
    yesapi.requestAppWxmini_CmsGetArticleList(null, that.data.page, that.data.perpage, function (res) {
      that.setData({ news: res.data.items })
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
  },
  go: function(event) {
    wx.navigateTo({
      url: '/pages/news/news-details?id=' + event.currentTarget.dataset.type
    })
  }
})
