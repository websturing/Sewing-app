<template>
    <div class="flex flex-col gap-1">
        <label v-if="label" :for="props.name" class="text-sm font-medium text-gray-700">
            {{ label }}
        </label>

        <n-select :id="props.name" :status="status" :multiple="multiple" :options="props.options"
            :placeholder="props.placeholder" :disabled="props.readonly" filterable v-bind="$attrs" :value="modelValue"
            @update:value="emit('update:modelValue', $event)" :class="[props.classContent, 'w-full']">


            <template #arrow>
                <!-- Error Icon -->
                <n-tooltip v-if="errorMessage" :show="errorMessage ? true : false" trigger="hover">
                    <template #trigger>
                        <n-icon :component="AlertOutline" color="red" />
                    </template>
                    {{ errorMessage }}
                </n-tooltip>
            </template>

        </n-select>
    </div>
</template>

<script setup lang="ts">
import { AlertOutline } from "@vicons/ionicons5";
import type { FormValidationStatus } from "naive-ui";
import { computed, type Component } from "vue";

interface Option {
    value: string | number;
    label: string;
}

interface Props {
    modelValue: string | number | string[] | number[] | null;
    options: Option[];
    name: string;
    label?: string;
    icon?: Component;
    placeholder?: string;
    errors?: Record<string, string | undefined>;
    readonly?: boolean;
    classContent?: string;
    multiple?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    placeholder: "Select Item",
    multiple: false,
});

const emit = defineEmits<{
    (e: "update:modelValue", value: string | number | string[] | number[] | null): void;
}>();

const errorMessage = computed(() => props.errors?.[props.name]);
const status = computed<FormValidationStatus | undefined>(() =>
    errorMessage.value ? "error" : undefined
);
</script>
