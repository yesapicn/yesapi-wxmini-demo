import yesapi from '../../utils/YesApi/yesapi.js';

Page({
  data: {
    goodsList: [],
    page: 1,
    limit: 10,
    count: 0,
    scrollTop: 0,
    showPage: false
  },
  onLoad: function () {
    var that = this;

    let params = {
      //cate_id: 0,
      //brand_id: 0,
      //keyword: '',
      //is_new: 1,
      //is_hot: 1,
      page: that.data.page,
      perpage: that.data.limit,
      sort: 'add_time',
      order: 'desc'
    }

    yesapi.requestAppWxmini_GoodsSearchList(params, function (res) {
      that.setData({ goodsList: res.data.list})
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
    
  }
})
