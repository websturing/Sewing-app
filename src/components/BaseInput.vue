<script setup lang="ts">
import { NInput } from "naive-ui"
import { type Component } from "vue"

type StatusType = "error" | "warning" | "success" | undefined


interface Props {
    modelValue: string
    placeholder?: string
    icon?: Component
    size?: "tiny" | "small" | "medium" | "large"
    clearable?: boolean
    type?: string
    disabled?: boolean
    status?: StatusType
    errorMessage?: string
}

const props = withDefaults(defineProps<Props>(), {
    placeholder: "",
    size: "medium",
    clearable: true,
    type: "text",
    disabled: false,
    status: undefined,
    errorMessage: ""
})

const emit = defineEmits<{
    (e: "update:modelValue", value: string): void
}>()
</script>

<template>
    <NInput :value="props.modelValue" :placeholder="props.placeholder" :size="props.size" :clearable="props.clearable"
        :disabled="props.disabled" :status="props.status" :error="props.errorMessage"
        @update:value="emit('update:modelValue', $event)">
        <template v-if="props.icon" #prefix>
            <n-icon :component="props.icon" />
        </template>
    </NInput>
</template>
