import { createApp } from 'vue';
import Plugin from './plugin';
import Store from './store';
import Component from './component';
import './app.scss';

const App = createApp({
  onShow () {}
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
}).use(Plugin).use(Component).use(Store);

export default App;
