const { postcssSupport, cssLoaderOptionSupport, defineConstantsSupport, aliasSupport } = require('./supports');

const config = {
  projectName: require('../package.json').name,
  framework: 'vue3',
  date: '2022-3-30',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  alias: aliasSupport(),
  plugins: ['taro-plugin-pinia', '@tarojs/plugin-html'],
  defineConstants: defineConstantsSupport(),
  copy: {
    patterns: [],
    options: {}
  },
  sass:{ data: `@import "./src/asset/theme/default.scss";@import "@nutui/nutui-taro/dist/styles/variables.scss";` },
  mini: {
    postcss: postcssSupport('mini'),
    cssLoaderOption: cssLoaderOptionSupport()
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    esnextModules: ['nutui-taro'],
    postcss: postcssSupport('h5'),
    cssLoaderOption: cssLoaderOptionSupport()
  }
};

module.exports = function (merge) {

  config.outputRoot = `${config.outputRoot}/${process.env.TARO_ENV}`;

  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'));
  }
  return merge({}, config, require('./prod'));
};
