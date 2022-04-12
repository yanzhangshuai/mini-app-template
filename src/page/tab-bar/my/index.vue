<template>
  <tab-bar>
    <view class="my">
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

const msg = ref('我的');
</script>

<style lang="scss">
.my {
  text {
    color: $title-color;
  }
}
</style>
