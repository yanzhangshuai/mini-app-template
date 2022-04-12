import { App, Plugin } from 'vue';
import uiComponents from './ui';

const ComponentPlugin: Plugin = {
  install (app: App) {
    useUI(app);
  }
};

export default ComponentPlugin;

function useUI(app: App): App {
  uiComponents.forEach((component) => {
    app.use(component);
  });
  return app;
}
