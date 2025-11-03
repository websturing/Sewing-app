<template>
    <div>
        <n-card>
            <p class="text-gray-400 text-sm">{{ props.title }}</p>
            <p :class="[props.variant, 'font-bold text-2xl']">{{ props.value }}</p>
        </n-card>
    </div>
</template>
<script setup lang="ts">
interface Props {
    title: string | boolean | number,
    value: string | boolean | number,
    variant?: string
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'text-blue-400'
})
</script>