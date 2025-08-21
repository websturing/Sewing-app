<template>
    <div>
        <n-space vertical size="large">
            <div class="flex justify-between">
                <div>
                    <n-input placeholder="Search" v-model:value="searchRef" clearable>
                        <template #prefix>
                            <n-icon :component="SearchOutline" />
                        </template>
                    </n-input>
                </div>
                <div>
                    <n-space>
                        <n-button type="warning" block @click="fnRefresh">
                            <template #icon>
                                <n-icon>
                                    <ReloadOutline />
                                </n-icon>
                            </template>
                            Refresh
                        </n-button>
                        <n-button type="success" block @click="$emit('create')">
                            <template #icon>
                                <n-icon>
                                    <CreateOutline />
                                </n-icon>
                            </template>
                            Create Role
                        </n-button>
                    </n-space>
                </div>
            </div>

            <n-data-table :columns="columns" :data="filteredData.slice((page - 1) * pageSize, page * pageSize)" bordered
                :loading="loading" :single-line="false" />

            <div class="flex justify-end mt-4">
                <n-pagination v-model:page="page" v-model:page-size="pageSize" :item-count="data.length"
                    :page-sizes="pageSizes" show-size-picker show-quick-jumper>

                    <template #prefix>
                        <span class="text-gray-400">Total: {{ data.length }} items</span>
                    </template>
                </n-pagination>
            </div>
        </n-space>

        <n-modal v-model:show="isModal">
            <n-card style="width: 900px" title="Modal" :bordered="false" size="huge" role="dialog" aria-modal="true">
                <PermissionForm :initialData="editingData" />
            </n-card>
        </n-modal>
    </div>
</template>

<script setup lang="ts">
import PermissionForm from "@module/permission/components/PermissionForm.vue";
import { usePermissionForm } from "@module/permission/composables/usePermissionForm";
import { useRoleTable } from "@module/Role/composables/useRoleTable";
import { useRoleStore } from "@module/Role/stores/Role";
import { CreateOutline, ReloadOutline, SearchOutline } from "@vicons/ionicons5";
import { onMounted, ref } from 'vue';
import type { RoleUpdate } from "../schemas/RoleSchema";
const editingData = ref({});

const emit = defineEmits<{
    (e: 'edit', role: RoleUpdate): void
    (e: 'create'): void
}>()



const store = useRoleStore()
const { data, filteredData, searchRef, loading, page, pageSize, pageSizes, columns, fnRefresh } = useRoleTable({
    onEdit: (role: RoleUpdate) => emit('edit', role)
})
const { isModal } = usePermissionForm()
onMounted(() => {
    store.fetchRole()
})







</script>