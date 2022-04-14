<template>
  <tab-bar>
    <view class="my">
      <text>{{ msg }}</text>
      <nut-button type="primary" @click="goToSubPackage()">跳转子包</nut-button>
    </view>
  </tab-bar>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from '@/router';
import { eventCenter } from '@tarojs/taro';
import { ref } from 'vue';
import TabBar from '@/component/tab-bar/index.vue';

definePageConfig({
  navigationStyle: 'default',
  navigationBarTitleText: '我的',
  usingComponents: {}
});

const router = useRouter();
const msg = ref('我的');

const goToSubPackage = () => {
  router.navigateTo({
    path: '/page/a-package/demo1/index',
    params: { index: '123' }
  }
  ).then(result => {
    console.log('then: ' , result);
  }).finally(() => {

    console.log('finally: ');
  });
};

</script>

<style lang="scss">
.my {
  text {
    color: $title-color;
  }
}
</style>
