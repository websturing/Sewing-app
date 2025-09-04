<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue"
import type { DropdownOption } from "naive-ui"
import { NDropdown } from "naive-ui"
import type { Component } from 'vue'


interface Props {
    label?: string
    icon?: Component
    type?: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'
    size?: 'tiny' | 'small' | 'medium' | 'large'
    disabled?: boolean
    block?: boolean
    circle?: boolean
    tertiary?: boolean
    quaternary?: boolean
    loading?: boolean
    tooltip?: string
    options: DropdownOption[]
}

const props = withDefaults(defineProps<Props>(), {
    type: 'default',
    size: 'medium',
    disabled: false
})

const emit = defineEmits<{
    (e: 'select', key: string): void
    (e: "click", evt: MouseEvent): void
}>()

function handleSelect(key: string) {
    emit('select', key)
}
</script>

<template>
    <NDropdown :options="props.options" trigger="click" @select="handleSelect">
        <n-tooltip v-if="props.tooltip" trigger="hover">
            <template #trigger>
                <BaseButton :label="props.label" :icon="props.icon" :type="props.type" :size="props.size"
                    :quaternary="true" :circle="true" :disabled="props.disabled" />
            </template>
            {{ props.tooltip }}
        </n-tooltip>

        <BaseButton v-else :label="props.label" :icon="props.icon" :type="props.type" :size="props.size"
            :quaternary="true" :circle="true" :disabled="props.disabled" />
    </NDropdown>
</template>
