<template>
    <div>
        <form @submit.prevent="submitForm">
            <n-space vertical size="large" class="w-full">
                <n-input type="email" v-model:value="email" placeholder="Email" size="large"
                    :status="errors.email ? 'error' : ''">
                    <template #prefix>
                        <n-icon :component="PersonCircleOutline" />
                    </template>
                </n-input>
                <n-input type="password" v-model:value="password" placeholder="Password" size="large"
                    :status="errors.password ? 'error' : ''">
                    <template #prefix>
                        <n-icon :component="LockClosedOutline" />
                    </template>
                </n-input>
            </n-space>
            <div class="mt-6">
                <n-button :loading="loading" strong secondary type="primary" size="large" class="!w-full"
                    @click="submitForm">
                    <template #icon>
                        <n-icon>
                            <LogInOutline />
                        </n-icon>
                    </template>
                    Sign In
                </n-button>

            </div>
        </form>
        <ErrorCard :errors="errors" class="mt-3" v-if="errors && Object.keys(errors).length > 0" />
    </div>
</template>

<script setup lang="ts">
import ErrorCard from '@/components/ErrorCard.vue';
import { useLoginForm } from '@/modules/login/composables/useLoginForm';
import { LockClosedOutline, LogInOutline, PersonCircleOutline } from '@vicons/ionicons5';

const {
    email,
    password,
    errors,
    loading,
    isSubmitting,
    submitForm } = useLoginForm();

</script>