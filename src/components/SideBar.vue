<template>
    <n-layout-sider bordered content-class="shadow-sm rounded-lg" collapse-mode="width" :collapsed-width="84" inverted
        :width="250" show-trigger :collapsed="isCollapsed" @collapse="isCollapsed = true" @expand="isCollapsed = false">
        <div class="flex flex-col justify-between h-full">
            <div>
                <div class="p-4 font-bold text-center">
                    {{ isCollapsed ? 'SW' : 'Sewing Application' }}
                </div>
                <n-scrollbar style="max-height: calc(100vh - 140px)">
                    <n-menu :options="menu" :value="activeKey" default-value="home" inverted :collapsed="isCollapsed"
                        :collapsed-width="84" :collapsed-icon-size="22" />
                </n-scrollbar>

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

<style scoped>
:deep(.n-scrollbar-rail__scrollbar) {
    background-color: #d13440 !important;
}

:deep(.n-scrollbar-rail) {
    background-color: transparent !important;
}

:deep(.n-scrollbar-rail:hover) {
    background-color: rgba(255, 0, 0, 0.15) !important;
}

:deep(.n-scrollbar-rail__scrollbar:hover) {
    background-color: rgba(255, 0, 0, 0.9) !important;
}
</style>
