<template>
    <div>
        <n-modal :show="props.show" :closable="false" preset="card" style="width: 600px" :close-on-esc="false"
            :mask-closable="false" @update:show="emit('update:show', $event)">
            <div class="flex justify-center p-5">
                <!-- Loading State -->
                <n-spin v-if="!props.error" :show="true" size="large">
                    <template #description>
                        <div class="text-center">
                            <p class="mb-2 font-bold mt-5 animate-pulse">{{ props.title }}</p>
                            <p>{{ props.description }}</p>
                        </div>
                    </template>
                </n-spin>

                <!-- Error State -->
                <div v-else class="text-center">
                    <NIcon :component="DocumentError16Filled" size="96" color="#d90429" />
                    <p class="mb-2 font-bold mt-5">{{ props.title }}</p>
                    <p class="mb-4">{{ props.description }}</p>
                    <n-button tertiary @click="emit('update:show', false)">Close</n-button>
                </div>
            </div>
        </n-modal>
    </div>
</template>

<script setup lang="ts">
import { DocumentError16Filled } from '@vicons/fluent'

interface Props {
    title?: string
    description?: string
    show?: boolean
    error?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    show: false,
    error: false
})

const emit = defineEmits<{
    (e: 'update:show', value: boolean): void
}>()
</script>
