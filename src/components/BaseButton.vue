<script setup lang="ts">
import { NButton } from "naive-ui"
import { type Component } from "vue"

interface Props {
    label?: string
    icon?: Component
    type?: "default" | "primary" | "info" | "success" | "warning" | "error"
    size?: "tiny" | "small" | "medium" | "large"
    block?: boolean
    disabled?: boolean
    loading?: boolean
    tertiary?: boolean
    quaternary?: boolean
    circle?: boolean
    tooltip?: string
    iconPlacement?: "left" | "right" | undefined
}

const props = withDefaults(defineProps<Props>(), {
    type: "default",
    size: "medium",
    block: false,
    disabled: false,
    loading: false,
    tertiary: false,
    quaternary: false,
    circle: false,
    iconPlacement: "left"
})

const emit = defineEmits<{
    (e: "click", evt: MouseEvent): void
}>()
</script>

<template>
    <n-tooltip v-if="props.tooltip" trigger="hover">
        <template #trigger>
            <NButton :type="props.type" :size="props.size" :block="props.block" :disabled="props.disabled"
                :icon-placement="props.iconPlacement" :tertiary="props.tertiary" :quaternary="props.quaternary"
                :circle="props.circle" :loading="props.loading" @click="emit('click', $event)">
                <template v-if="props.icon" #icon>
                    <component :is="props.icon" />
                </template>
                {{ props.label }}
                <slot />
            </NButton>
        </template>
        {{ tooltip }}
    </n-tooltip>
    <NButton v-else :type="props.type" :size="props.size" :block="props.block" :disabled="props.disabled"
        :icon-placement="props.iconPlacement" :tertiary="props.tertiary" :quaternary="props.quaternary"
        :circle="props.circle" :loading="props.loading" @click="emit('click', $event)">
        <template v-if="props.icon" #icon>
            <component :is="props.icon" />
        </template>
        {{ props.label }}
        <slot />
    </NButton>


</template>
