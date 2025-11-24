<script setup lang="ts">
import { AlertOutline } from "@vicons/ionicons5";
import { NSelect, type FormValidationStatus, type SelectOption } from "naive-ui";
import { computed } from "vue";

interface Props {
    modelValue: string | number | Array<string | number> | null
    options: SelectOption[]
    placeholder?: string
    clearable?: boolean
    filterable?: boolean
    size?: "tiny" | "small" | "medium" | "large"
    icon?: any;
    errors?: Record<string, string | undefined>;
    label?: string;
    name: string;
    multiple?: boolean
    classContent?: string
}

const props = withDefaults(defineProps<Props>(), {
    placeholder: "Select option",
    clearable: true,
    multiple: false,
    filterable: true,
    size: "medium",
    icon: null
})

const emit = defineEmits<{
    (e: "update:modelValue", value: string | number | null): void
}>()

const errorMessage = computed(() => props.errors?.[props.name]);
const status = computed<FormValidationStatus | undefined>(() =>
    errorMessage.value ? "error" : undefined
);

</script>

<template>
    <div class="flex flex-col gap-1">
        <label v-if="label" :status="status" :for="props.name" class="text-sm font-medium text-gray-700">
            {{ label }}
        </label>
        <NSelect :id="props.name" :value="props.modelValue" :options="props.options" :multiple="props.multiple"
            :placeholder="props.placeholder" :clearable="props.clearable" :filterable="props.filterable"
            :size="props.size" @update:value="emit('update:modelValue', $event)"
            :class="[props.classContent, '!min-w-[200px]']" :max-tag-count="props.multiple ? 0 : undefined"
            :render-tag="props.multiple ? () => null : undefined">

            <template #arrow>
                <!-- Error Icon -->
                <n-tooltip v-if="errorMessage" :show="errorMessage ? true : false" trigger="hover">
                    <template #trigger>
                        <n-icon :component="AlertOutline" color="red" />
                    </template>
                    {{ errorMessage }}
                </n-tooltip>
            </template>
        </NSelect>
    </div>
</template>
