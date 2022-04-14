<template>
  <tab-bar>
    <view :class="styles.index">
      <view class="text-red-500!">
        <text>项目名称：</text>
        <text :class="styles.text">{{ $config.APP_NAME }}</text>
      </view>

      <view>
        <text>当前时间：</text>
        <text :class="styles.text">{{ $globalProps.dateFormat($window.Date.now()) }}</text>
      </view>

      <view>
        <text :class="styles.text">{{ msg }}</text>
      </view>

      <nut-button type="primary" @click="visible.popup = true">主要按钮</nut-button>
    </view>
  </tab-bar>
  <popup v-model:visible="visible.popup" />
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useDidShow } from '@tarojs/taro';
import { useConfig } from '@/config';
import TabBar from '@/component/tab-bar/index.vue';
import Popup from '@/component/popup/index.vue';

import styles from  './index.scss';

definePageConfig({
  navigationStyle: 'default',
  navigationBarTitleText: '首页'
});

const config = useConfig();

const msg = ref('Hello world');

const visible = reactive({
  popup: false
});

useDidShow(() => {
  console.log('--didShow',config.FILE_BASE_URL);
});

</script>
