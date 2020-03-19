
Page({
  data:{
    page: 1,
    perpage: 100
    
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: CONFIG.API_URL.GET_INDEX + "&s=App.Market_LastestNews.GetList&perpage=" + that.data.perpage + "&page=" + that.data.page,
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        if (res.statusCode == 200 && res.data.ret == 200) {
          if (res.statusCode == 200 && res.data.ret == 200) {
            that.setData({ news: res.data.data.list });
          }
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
  },
  go: function(event) {
    wx.navigateTo({
      url: '/pages/news/news-details?id=' + event.currentTarget.dataset.type
    })
  }
})
