<template>
  <view :class="styles.tabBar">
    <view :class="styles.body">
      <slot />
    </view>
    <nut-tabbar :visible="activeIndex" :safe-area-inset-bottom="true" @tab-switch="onTabSwitch">
      <nut-tabbar-item v-for="item in tabBarItems" :key="item.title" :tab-title="item.title" :icon="item.icon" />
    </nut-tabbar>
  </view>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import Taro from '@tarojs/taro';
import { useTabBarStore } from '@/store/tab-bar';
import styles from './index.scss';

interface ITabBarItem {
  title: string;
  path: string;
  icon?: string
}
const tabBarStore = useTabBarStore();


const tabBarItems:Array<ITabBarItem> = [
  { title: '首页', path: '/page/tab-bar/home/index', icon: 'home' },
  { title: '购物车', path: '/page/tab-bar/cart/index', icon: 'cart' },
  { title: '我的', path: '/page/tab-bar/my/index', icon: 'my' }
];

const activeIndex = computed(() => tabBarStore.activeIndex);

const onTabSwitch = (data: { tabTitle: string }) => {
  const index = tabBarItems.findIndex(item => item.title === data.tabTitle);
  if (index === -1) return;
  tabBarStore.setActiveIndex(index);

  Taro.switchTab({ url: tabBarItems[index].path });
};

</script>
