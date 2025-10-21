<template>
    <div>
        <div class="card bg-red-50 rounded-lg p-6">
            <p class="mb-2 flex items-center text-xl text-bold ">
                <n-icon :component="WarningOutline" color="#ffcd03" />
                <span class="text-red-600 ms-3">Errors</span>
            </p>
            <p v-for="(label, key) in props.errors" :key="label" class="mb-1">
                <span class="me-3 fw-bold"> {{ key }} :</span>
                <span class="text-sm text-danger">{{ label }}</span>
            </p>
        </div>
    </div>
</template>
<script setup lang="ts">
import { WarningOutline } from '@vicons/ionicons5';
interface ErrorProps {
    errors?: Record<string, string>;
}

const props = withDefaults(defineProps<ErrorProps>(), {
    errors: () => ({}),
});

</script>