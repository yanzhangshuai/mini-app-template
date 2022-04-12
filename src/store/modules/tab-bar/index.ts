import { defineStore } from 'pinia';

type TabBarState  = {
  _activeIndex: number
}

export const useTabBarStore = defineStore<'tab-bar-store',TabBarState>('tab-bar-store',{
  state: () => ({ _activeIndex : 0 }),

  getters: {
    activeIndex(state): number {
      return state._activeIndex;
    }
  },
  actions: {
    setActiveIndex(activeIndex: number): void {
      this._activeIndex = activeIndex;
    }
  },
  debounce: {
    setActiveIndex: 100
  }
});
