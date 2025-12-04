<template>
    <div>
        <div :class="['flex items-center gap-2 text-xs', props.textColor]">
            <n-icon :component="props.icon" :size="props.size" />
            <p :class="[props.labelClass]">{{ props.label }}</p>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { Component } from 'vue';

interface Props {
    icon: Component
    label: string | null
    size?: number
    labelClass?: string
    textColor?: string
}

const props = withDefaults(defineProps<Props>(), {
    size: 18,
    textColor: 'text-gray-400',
    labelClass: 'text-xs'
})
</script>