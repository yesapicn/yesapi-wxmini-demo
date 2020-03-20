//app.js
App({
  onLaunch: function () {
  },
  globalData: {
    userInfo: null,
    uuid: null,
    token: null,
    user_id: 0,
    openid: '',
    yesapi: { // 小白开放平台配置，查看：http://open.yesapi.cn/?r=App/Mine
      api_host: 'https://dogstar.api.yesapi.cn', // 接口域名
      app_key: 'CEE4B8A091578B252AC4C92FB4E893C3', // app_key
      app_secrect: '' // app_secrect
    }
  }
})