<script setup lang="ts">
import { NSelect, type SelectOption } from "naive-ui"

interface Props {
    modelValue: string | number | null
    options: SelectOption[]
    placeholder?: string
    clearable?: boolean
    filterable?: boolean
    size?: "tiny" | "small" | "medium" | "large"
    icon?: any;
}

const props = withDefaults(defineProps<Props>(), {
    placeholder: "Select option",
    clearable: true,
    filterable: true,
    size: "medium",
    icon: null
})

const emit = defineEmits<{
    (e: "update:modelValue", value: string | number | null): void
}>()
</script>

<template>
    <NSelect :value="props.modelValue" :options="props.options" :placeholder="props.placeholder"
        :clearable="props.clearable" :filterable="props.filterable" :size="props.size"
        @update:value="emit('update:modelValue', $event)">
    </NSelect>
</template>
