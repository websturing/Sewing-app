<template>
    <n-layout-sider bordered content-class="shadow-sm rounded-lg" collapse-mode="width" :collapsed-width="84" inverted
        :width="250" show-trigger :collapsed="isCollapsed" @collapse="isCollapsed = true" @expand="isCollapsed = false">
        <div class="flex flex-col justify-between h-full">
            <div>
                <div class="p-4 font-bold text-center">
                    {{ isCollapsed ? 'SW' : 'Sewing Application' }}
                </div>
                <n-menu :options="menu" :value="activeKey" default-value="home" inverted :collapsed="isCollapsed"
                    :collapsed-width="84" :collapsed-icon-size="22" />

            </div>
            <div class="p-4">
                <n-button type="error" block @click="toggleModal">
                    <template #icon>
                        <n-icon>
                            <LogOutOutline />
                        </n-icon>
                    </template>
                    Sign Out
                </n-button>
            </div>

        </div>
    </n-layout-sider>
</template>

<script setup lang="ts">
import { useSideBar } from '@/composables/useSideBar';
import { useLogout } from '@/modules/login/composables/useLogout';
import { LogOutOutline } from '@vicons/ionicons5';

const {
    isCollapsed,
    menu,
    activeKey,
} = useSideBar()

const { toggleModal } = useLogout();
</script>
