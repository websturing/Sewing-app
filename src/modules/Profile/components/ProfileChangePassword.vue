<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <n-space vertical size="large">
                <InputWithError type="password" v-model="password" name="password" :errors="errors" label="Password" />
                <InputWithError type="password" v-model="passwordConfirm" name="passwordConfirm" :errors="errors"
                    label="Confirm Password" />
                <n-button type="success" icon-placement="right" attr-type="submit" block>
                    <template #icon>
                        <n-icon>
                            <SendOutline />
                        </n-icon>
                    </template>
                    Apply Changes
                </n-button>
            </n-space>
        </form>
    </div>

</template>

<script setup lang="ts">
import InputWithError from '@/components/InputLabelWithError.vue';
import { SendOutline } from '@vicons/ionicons5';
import { useProfileChangePassword } from '../composables/useProfileChangePassword';

const emit = defineEmits(['submitted'])

const handleSubmit = async () => {
    await onSubmit()
    emit('submitted')

}


const {
    password,
    passwordConfirm,
    errors,
    onSubmit
} = useProfileChangePassword()
</script>