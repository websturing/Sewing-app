<template>
    <div>
        <div class="flex gap-3">
            <div class="flex-1">
                <n-space vertical size="large">
                    <ProfileCard @change-password="handleModalChangePassword(true)" />
                    <ProfilePermissions />


                </n-space>
            </div>
            <div class="flex-2">
                <ProfileHistory />
            </div>
        </div>
        <n-modal v-model:show="isModalChangePasswordVisible" :closable="true" title="Change Your Password" preset="card"
            style="width: 600px">
            <ProfileChangePassword @submitted="handleModalChangePassword(false)" />
        </n-modal>

    </div>
</template>
<script setup lang="ts">
import ProfileCard from "@module/Profile/components/ProfileCard.vue"
import ProfileChangePassword from "@module/Profile/components/ProfileChangePassword.vue"
import ProfileHistory from "@module/Profile/components/ProfileHistory.vue"
import ProfilePermissions from "@module/Profile/components/ProfilePermission.vue"
import { useProfile } from "@module/Profile/composables/useProfile"
import { useHead } from '@unhead/vue'
import { ref } from "vue"

const { email } = useProfile()
const isModalChangePasswordVisible = ref(false)

const handleModalChangePassword = (isShow: boolean) => {
    isModalChangePasswordVisible.value = isShow
}

useHead({
    title: `Profile -  ${email}`,
    meta: [
        { name: 'description', content: 'Halaman dashboard aplikasi' }
    ]
})
</script>
