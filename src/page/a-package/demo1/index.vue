<template>
  <view>a-package-demo1</view>
  <nut-button type="primary" @click="goBack()">go Back</nut-button>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from '@/router';

const route = useRoute();
const router = useRouter();


console.log('query.index',route.params.index);
console.log('query.index',route.path);
console.log('router.stack', router.stack);


const goBack = () => {
  router.navigateBack().catch(res => {
    console.log('res', res);
  });
};
</script>
<style lang="scss"></style>
