import { App, Plugin } from 'vue';
import { debounce } from 'lodash-es';
import { createPinia, Pinia } from 'pinia';
import { PiniaDebounce } from '@pinia/plugin-debounce';

const StorePlugin: Plugin = {
  install (app: App) {
    injectStore(app);
  }
};

export default StorePlugin;


export type Store = Pinia;

let store: Store;

function injectStore(app: App<Element>) {
  const store = createPinia();

  store.name = 'pinia';

  store.use(PiniaDebounce(debounce));

  app.use(store);
}

export function useStore(): Readonly<Store> {
  return store;
}
