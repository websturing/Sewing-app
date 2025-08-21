<template>
    <div>
        <n-card content-class="bg-indigo-100 rounded-lg">
            <div class="flex gap-2 items-center">
                <n-avatar round :size="64" :src="defaultAvatar" />
                <n-space vertical size="small">
                    <span class="font-bold">{{ email }}</span>
                    <div class="text-gray-400 flex">
                        <n-tag v-for="role in roles" :key="role" type="warning" size="small">
                            {{ role }}
                        </n-tag>
                    </div>
                </n-space>
            </div>
        </n-card>
        <n-space class="mt-2">
            <n-button type="default" block size="large">
                <template #icon>
                    <n-icon>
                        <DocumentLockOutline />
                    </n-icon>
                </template>
                Change Password
            </n-button>
            <n-button type="error" block size="large">
                <template #icon>
                    <n-icon>
                        <LogOut />
                    </n-icon>
                </template>
                Sign Out
            </n-button>
        </n-space>
    </div>
</template>
<script setup lang="ts">
import defaultAvatar from '@/assets/img/profile-circle.png';
import { useProfile } from '@module/Profile/composables/useProfile';
import { DocumentLockOutline, LogOut } from '@vicons/ionicons5';

const { email, role: roles } = useProfile()
</script>
