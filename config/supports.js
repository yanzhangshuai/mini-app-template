const { resolve } = require('./util');

module.exports = {
  defineConstantsSupport,
  aliasSupport,
  cssLoaderOptionSupport,
  postcssSupport
}

/**
 * 定义变量
 * @returns {{GLOBAL_APP_VERSION: *}}
 */
 function defineConstantsSupport() {

    const { version: projectVersion } = require('../package.json');

    const variables = {
      GLOBAL_APP_VERSION: projectVersion,
    };

  Object.keys(variables).forEach((key) => {
    variables[key] = JSON.stringify(variables[key]);
  });

  return variables;
}

/**
 * 别名支持，根据tsconfig.json处理
 * @returns {{}}
 */
function aliasSupport() {
  try {
    const paths = {};

    const ALIAS_REGEX = /^.+(?=\/\*)/;

    const { compilerOptions } = require('../tsconfig.json');

    Object.keys(compilerOptions.paths).forEach((key) => {
      const path = compilerOptions.paths[key];

      if (!Array.isArray(path)) return;
      const aliasName = key.match(ALIAS_REGEX)?.[0];

      const aliasPath = path?.[0].match(ALIAS_REGEX)?.[0];
      if (!aliasName || !aliasPath) return;

      paths[aliasName] = resolve(compilerOptions.baseUrl, aliasPath);
    });

    return paths;
  }catch (e) {
    throw new Error('tsconfig.json格式有问题:', e);
  }
}

/**
 * css Module
 * @returns {{localsConvention: string, modules: {localIdentName: string,
 *   getLocalIdent: ((function(*, *, *): (*|undefined))|*)}}}
 */
function cssLoaderOptionSupport() {
  return {
    localsConvention: 'camelCase',
    modules: {
      localIdentName: '[name]__[local]___[hash:base64:5]',
      getLocalIdent: (context, localIndentName, localName) => {
        if (context.resourcePath.includes('node_modules') || context.resourcePath.endsWith('.global.scss')) {
          return localName;
        }
      }
    }
  };
};

/**
 * postcss 支持
 * @param platform
 * @returns {{autoprefixer: {enable: boolean, config: {}}}|number|{pxtransform:
 *   {enable: boolean, config: {selectorBlackList: string[], designWidth(*):
 *   number}}, url: {enable: boolean, config: {limit: number}}}}
 */
function postcssSupport(platform) {

  if (platform === 'mini') {
    return {
      pxtransform: {
        enable: true,
        config: {
          selectorBlackList: ['nut-'],
          designWidth(input) {
            const isNutUi = input.file.replace(/\\+/g, '/')
              .indexOf('@nutui/nutui-taro') > -1;
            return isNutUi ? 375 : 750;
          }
        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      }
    };
  }

  return {
    autoprefixer: {
      enable: true,
      config: {
      }
    }
  };
};
