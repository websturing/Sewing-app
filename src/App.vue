<template>
  <NConfigProvider :theme-overrides="themeOverrides">
    <n-dialog-provider>
      <NMessageProvider>
        <n-notification-provider>
          <n-modal-provider>
            <router-view />
          </n-modal-provider>
        </n-notification-provider>
      </NMessageProvider>
    </n-dialog-provider>
  </NConfigProvider>
</template>
<script setup lang="ts">
import { themeOverrides } from '@/theme/index';
import { NConfigProvider, NMessageProvider } from 'naive-ui';
</script>