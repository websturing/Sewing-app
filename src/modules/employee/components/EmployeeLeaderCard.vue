<template>
    <div>
        <n-card :class="{
            'bg-yellow-200 ring-2 ring-yellow-400': isHighlighted,
            'bg-white': !isHighlighted,
        }">
            <div class="flex items-center gap-2">
                <n-icon :component="ChartPerson20Filled" size="24" />
                <p>Leader</p>
            </div>
            <p class="text-3xl font-bold mt-2">
                Administrator
            </p>
        </n-card>
    </div>
</template>

<script setup lang="ts">
import { ChartPerson20Filled } from '@vicons/fluent';
import { ref, watch } from 'vue';

interface Props {
    highlightTrigger?: number | boolean
}

const props = defineProps<Props>()

const isHighlighted = ref(false)
watch(
    () => props.highlightTrigger,
    () => {
        // setiap kali trigger berubah (meskipun nilainya sama)
        isHighlighted.value = true
        setTimeout(() => {
            isHighlighted.value = false
        }, 800)
    },
    { immediate: false }
)
</script>
