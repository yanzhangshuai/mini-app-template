export default defineAppConfig({
  pages: [
    'page/main-package/tab-bar/home/index',
    'page/main-package/tab-bar/cart/index',
    'page/main-package/tab-bar/my/index'
  ],

  subPackages: [
    {
      root: 'page/a-package/',
      pages: [
        'demo1/index'
      ]
    }
  ],

  tabBar: {
    custom: true,
    list: [
      { pagePath: 'page/main-package/tab-bar/home/index', text: '首页' },
      { pagePath: 'page/main-package/tab-bar/cart/index', text: '购物车' },
      { pagePath:'page/main-package/tab-bar/my/index', text: '我的' }

    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
});
