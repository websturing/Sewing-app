<template>
    <div>
        <BaseIconWithLabel :icon="PersonCircle20Filled" :size="24" :label="email" />
    </div>
</template>
<script setup lang="ts">
import BaseIconWithLabel from '@/components/BaseIconWithLabel.vue';
import { PersonCircle20Filled } from '@vicons/fluent';

interface Props {
    email: string
}
const props = withDefaults(defineProps<Props>(), {})
</script>