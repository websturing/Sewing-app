<template>
    <div>
        <n-layout-header bordered class="flex items-center justify-between px-4 min-h-[54px] bg-white">

            <div class="font-bold text-lg">Sewing Application</div>
            <div class="flex item-center">
                <n-dropdown :options="menuOptions" placement="bottom-end" @select="handleSelect" style="width:200px">
                    <div class="profile-trigger">
                        <n-avatar round size="small" :src="defaultAvatar" class="avatar" />
                        <span class="user-name">{{ email }}</span>
                    </div>
                </n-dropdown>
            </div>
        </n-layout-header>
    </div>
</template>

<script setup lang="ts">
import defaultAvatar from '@/assets/img/profile-circle.png'
import { useAuth } from '@/composables/useAuth'
import { useLogout } from '@/modules/Login/composables/useLogout'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const route = useRouter()
const { email } = useAuth()

const menuOptions = ref([
    {
        label: 'Profile',
        key: 'profile'
    },
    {
        label: 'Logout',
        key: 'logout'
    }
])

const { toggleModal } = useLogout()

const handleSelect = (key: any) => {
    if (key === 'profile') {
        route.push({ name: 'profile' })
    } else if (key === 'logout') {
        toggleModal()
    }
}
</script>

<style scoped>
.profile-trigger {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.profile-trigger:hover {
    background-color: rgba(0, 0, 0, 0.04);
}

.user-name {
    font-weight: 500;
    color: #1f2937;
    font-size: 14px;
}
</style>