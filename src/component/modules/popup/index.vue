<template>
  <nut-popup v-model:visible="show" position="bottom" :style="{ height: '60%' }">
    <view>
      <nut-button type="danger" @click="visible.del = true">删除</nut-button>
    </view>
    <nut-dialog v-model:visible="visible.del" title="基础弹框" content="这是基础弹框。" />
  </nut-popup>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue';

interface IPopup {
  visible: boolean
}

const props = defineProps<IPopup>();

const emits = defineEmits(['update:visible']);

const visible = reactive({
  del: false
});

const show = computed({
  get: () => props.visible,
  set: (value: boolean) => emits('update:visible', value)
});
</script>
