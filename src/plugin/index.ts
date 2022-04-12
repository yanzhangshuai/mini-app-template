import { App, Plugin } from 'vue';
import { setupGlobalProperties } from './global-property';

const _Plugin: Plugin =  {

  install (app: App) {
    globalDefined();
    injectPlugin(app);
  }
};

export default _Plugin;

function globalDefined() {
  //  TODO:解决使用lodash debounce时bug: https://github.com/NervJS/taro/issues/8098#issuecomment-731915642
  Object.assign(global, {
    Array: Array,
    Date: Date,
    Error: Error,
    Function: Function,
    Math: Math,
    Object: Object,
    RegExp: RegExp,
    String: String,
    TypeError: TypeError,
    setTimeout: setTimeout,
    clearTimeout: clearTimeout,
    setInterval: setInterval,
    clearInterval: clearInterval
  });
}

function injectPlugin(app: App<Element>) {
  setupGlobalProperties(app);
}

