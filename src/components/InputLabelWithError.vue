<script setup lang="ts">
import { AlertOutline, EyeOffOutline, EyeOutline } from "@vicons/ionicons5";
import { NButton, NIcon, NInput, NTooltip, type FormValidationStatus } from "naive-ui";
import { computed, ref } from "vue";

interface Props {
    modelValue: string | null;
    name: string;
    label?: string;
    errors?: Record<string, string | undefined>;
    type?: "text" | "textarea" | "password";
}

const props = withDefaults(defineProps<Props>(), {
    type: 'text'
});

const emit = defineEmits<{
    (e: "update:modelValue", value: string | null): void;
}>();

const errorMessage = computed(() => props.errors?.[props.name]);
const status = computed<FormValidationStatus | undefined>(() =>
    errorMessage.value ? "error" : undefined
);
const showPassword = ref(false);
</script>

<template>
    <div class="flex flex-col gap-1">
        <!-- Label -->
        <label v-if="label" :for="props.name" class="text-sm font-medium text-gray-700">
            {{ label }}
        </label>

        <!-- Input -->
        <n-input :id="props.name" :status="status" :value="modelValue" @update:value="emit('update:modelValue', $event)"
            :type="props.type === 'password' && showPassword ? 'text' : props.type" class="w-full">

            <template #suffix>
                <!-- Password Toggle Button (hanya untuk type password) -->
                <n-button v-if="props.type === 'password'" quaternary size="small" @click="showPassword = !showPassword"
                    :class="{ 'mr-2': errorMessage }" class="password-toggle-btn">
                    <n-icon :component="showPassword ? EyeOffOutline : EyeOutline" />
                </n-button>

                <!-- Error Icon -->
                <n-tooltip v-if="errorMessage" :show="errorMessage ? true : false" trigger="hover">
                    <template #trigger>
                        <n-icon :component="AlertOutline" color="red" />
                    </template>
                    {{ errorMessage }}
                </n-tooltip>
            </template>
        </n-input>
    </div>
</template>

<style scoped>
.password-toggle-btn {
    margin-right: 4px;
}
</style>