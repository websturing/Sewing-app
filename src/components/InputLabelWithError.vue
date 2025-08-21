<script setup lang="ts">
import { AlertOutline } from "@vicons/ionicons5";
import { NIcon, NInput, NTooltip, type FormValidationStatus } from "naive-ui";
import { computed } from "vue";

interface Props {
    modelValue: string | null;
    name: string;
    label?: string; // <-- tambahan
    errors?: Record<string, string | undefined>;
}

const props = defineProps<Props>();
const emit = defineEmits<{
    (e: "update:modelValue", value: string | null): void;
}>();

const errorMessage = computed(() => props.errors?.[props.name]);
const status = computed<FormValidationStatus | undefined>(() =>
    errorMessage.value ? "error" : undefined
);
</script>

<template>
    <div class="flex flex-col gap-1 ">
        <!-- Label -->
        <label v-if="label" :for="props.name" class="text-sm font-medium text-gray-700">
            {{ label }}
        </label>

        <!-- Input -->
        <n-input :id="props.name" :status="status" :value="modelValue" @update:value="emit('update:modelValue', $event)"
            class="w-full">
            <template #suffix>
                <n-tooltip v-if="errorMessage" trigger="hover" :show="errorMessage ? true : false">
                    <template #trigger>
                        <n-icon :component="AlertOutline" color="red" />
                    </template>
                    {{ errorMessage }}
                </n-tooltip>
            </template>
        </n-input>
    </div>
</template>
