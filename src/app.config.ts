export default defineAppConfig({
  pages: [
    'page/tab-bar/home/index',
    'page/tab-bar/cart/index',
    'page/tab-bar/my/index'
  ],

  tabBar: {
    custom: true,
    list: [
      { pagePath: 'page/tab-bar/home/index', text: '首页' },
      { pagePath: 'page/tab-bar/cart/index', text: '购物车' },
      { pagePath:'page/tab-bar/my/index', text: '我的' }

    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
});
