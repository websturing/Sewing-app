<script setup lang="ts">
import { NInput } from "naive-ui"
import { type Component, ref, watch } from "vue"

type StatusType = "error" | "warning" | "success" | undefined


interface Props {
    modelValue: string | null
    placeholder?: string
    icon?: Component
    size?: "tiny" | "small" | "medium" | "large"
    clearable?: boolean
    type?: string
    disabled?: boolean
    status?: StatusType
    errorMessage?: string
    loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    placeholder: "",
    size: "medium",
    clearable: true,
    type: "text",
    disabled: false,
    status: undefined,
    errorMessage: "",
    loading: false
})

const emit = defineEmits<{
    (e: "update:modelValue", value: string): void
    (e: "input", value: string): void
    (e: "enter", value: any): void
}>()

const isDisabled = ref(props.disabled)

watch(() => props.loading, (newValue) => {
    isDisabled.value = newValue
})
</script>

<template>
    <NInput :value="props.modelValue" :placeholder="props.placeholder" :size="props.size" :clearable="props.clearable"
        :disabled="isDisabled" :status="props.status" :error="props.errorMessage" :loading="props.loading"
        @update:value="emit('update:modelValue', $event)" @input="emit('input', $event)"
        @keyup.enter="emit('enter', $event)">
        <template v-if="props.icon" #prefix>
            <n-icon :component="props.icon" />
        </template>
    </NInput>
</template>
