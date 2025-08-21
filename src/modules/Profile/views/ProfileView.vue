<template>
    <div>
        <div class="flex gap-3">
            <div class="flex-1">
                <n-space vertical size="large">
                    <ProfileCard />
                    <ProfilePermissions />
                </n-space>
            </div>
            <div class="flex-2">
                <ProfileHistory />
            </div>
        </div>


    </div>
</template>
<script setup lang="ts">
import ProfileCard from "@module/Profile/components/ProfileCard.vue"
import ProfileHistory from "@module/Profile/components/ProfileHistory.vue"
import ProfilePermissions from "@module/Profile/components/ProfilePermission.vue"
import { useProfile } from "@module/Profile/composables/useProfile"
import { useHead } from '@unhead/vue'

const { email } = useProfile()

useHead({
    title: `Profile -  ${email}`,
    meta: [
        { name: 'description', content: 'Halaman dashboard aplikasi' }
    ]
})
</script>
