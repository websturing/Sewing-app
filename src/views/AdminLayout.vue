<template>
    <n-layout has-sider class="h-screen">
        <!-- Sidebar -->
        <SideBar />

        <!-- Main Layout -->
        <n-layout class="flex flex-col h-screen">
            <!-- Header -->

            <HeaderBar />
            <!-- Wrapper untuk content+footer -->
            <div class="flex-1 flex flex-col">
                <!-- Content (scrollable) -->
                <n-layout-content class="flex-1 overflow-y-auto p-4 pt-6 bg-gray-50">
                    <div class="space-y-40">
                        <RouterView />
                        <LogOutForm />
                    </div>
                </n-layout-content>

            </div>
        </n-layout>
    </n-layout>
</template>

<script setup lang="ts">
import HeaderBar from '@/components/HeaderBar.vue';
import SideBar from '@/components/SideBar.vue';
import LogOutForm from '@/modules/Login/components/LogOutForm.vue';
</script>

<style scoped>
:deep(.n-layout-sider) {
    border-radius: 12px;
    overflow: hidden;
    margin: 4px;
    color: #ffff;
}
</style>