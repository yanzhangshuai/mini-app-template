<template>
  <tab-bar>
    <view class="shopping-cart">
      <text>{{ msg }}</text>
    </view>
  </tab-bar>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TabBar from '@/component/tab-bar/index.vue';

definePageConfig({
  navigationStyle: 'default',
  navigationBarTitleText: '购物车',
  usingComponents: {}
});

const msg = ref('购物车');
</script>

<style lang="scss">
.shopping-cart {
  text {
    color: $title-color;
  }
}
</style>
