<template>
    <div>
        <n-card title="Access Control">
            <n-space>
                <n-tag v-for="item in permissions" :key="item">
                    {{ item }}
                </n-tag>
            </n-space>
        </n-card>
    </div>
</template>
<script setup lang="ts">
import { useProfile } from '@module/Profile/composables/useProfile';


const { permissions } = useProfile()
</script>