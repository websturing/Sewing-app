<template>
    <div>
        <h2 class="text-xl font-bold mb-1">Access Control</h2>
        <p>Manage menu and feature permissions for user roles. or Configure what users can see and do based on their
            role</p>

        <div class="mt-5">
            <n-tabs type="segment" animated default-value="role">
                <n-tab-pane name="role" tab="Roles">
                    <RoleView />
                </n-tab-pane>
                <n-tab-pane name="menu" tab="Menu Permission">
                    <PermissionTable />
                </n-tab-pane>
            </n-tabs>
        </div>
    </div>
</template>

<script setup lang="ts">
import RoleView from "@/modules/Role/views/RoleView.vue";
import PermissionTable from "@module/permission/components/PermissionTable.vue";
</script>