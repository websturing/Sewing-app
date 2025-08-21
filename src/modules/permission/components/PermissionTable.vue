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
                        <n-button type="success" block @click="isModal = true">
                            <template #icon>
                                <n-icon>
                                    <CreateOutline />
                                </n-icon>
                            </template>
                            Create Permission
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
            <n-card style="width: 900px" :title="title" :bordered="false" size="huge" role="dialog" aria-modal="true">
                <PermissionForm :initialData="editingData" />
            </n-card>
        </n-modal>
    </div>
</template>

<script setup lang="ts">
import PermissionForm from "@module/permission/components/PermissionForm.vue";
import { usePermission } from "@module/permission/composables/usePermission";
import { usePermissionForm } from "@module/permission/composables/usePermissionForm";
import { useModuleStore } from "@module/permission/stores/permission";
import { CreateOutline, ReloadOutline, SearchOutline } from "@vicons/ionicons5";
import { onMounted, ref } from 'vue';

const title = ref("Permission Form")
const editingData = ref({});
const openModal = (row: any) => {
    console.log(row)
    editingData.value = row
    isModal.value = true
}



const store = useModuleStore()
const { data, filteredData, searchRef, loading, page, pageSize, pageSizes, columns, fnRefresh } = usePermission({
    onEdit: openModal
})
const { isModal } = usePermissionForm()
onMounted(() => {
    store.fetchModule()
})







</script>