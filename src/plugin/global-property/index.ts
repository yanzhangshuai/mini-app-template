import { App } from 'vue';
import { useConfig } from '@/config';
import { dateFormat } from '@/util/date';

let globalProps: GlobalProps;

export function setupGlobalProperties(app: App<Element>): App<Element> {
  globalProps = {
    dateFormat: dateFormat
  };

  Object.defineProperty(app.config.globalProperties, '$window', {
    enumerable: false,
    get() {
      return window;
    }
  });

  const config = useConfig();

  Object.defineProperty(app.config.globalProperties, '$config', {
    enumerable: false,
    get() {
      return config;
    }
  });

  Object.defineProperty(app.config.globalProperties, '$globalProps', {
    enumerable: false,
    get() {
      return globalProps;
    }
  });
  return app;
}

export function useGlobalProps(): GlobalProps {
  return globalProps;
}
