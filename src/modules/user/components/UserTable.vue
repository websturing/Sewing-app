<template>
    <div class="flex flex-col gap-5">
        <div class="flex gap-10">
            <div class="flex-1">
                <BaseAdvanceFilter v-model="search" v-model:dateRange="dateRange" @click:export="handleExportModal"
                    @click:refresh="handleFetch" />
            </div>
            <div class="">
                <BaseButton label="Create User" :icon="Create" type="primary" @click="handleCreate" />
            </div>
        </div>
        <BaseDatable :columns="columns" :data="rows" :loading="loading">
            <template #actions="{ row }">
                <div class="flex  gap-2">
                    <BaseDatatableButton :row="row" label-button-delete="Delete" @click:edit="handleEditModal"
                        @click:delete="handleDeleteEmployee(row.id)" />
                    <BaseDropdown tooltip="More Actions" :icon="MoreVertical24Filled" :options="dropdownOptions"
                        @select="handleDropdown" />
                </div>
            </template>
        </BaseDatable>
        <div class="flex justify-end mt-4">
            <n-pagination :page="meta.currentPage" :page-size="meta.perPage" :page-count="meta.lastPage"
                :page-sizes="[5, 10, 20, 50]" @update:page="handlePageChange"
                @update:page-size="handlePageSizeChange" />
        </div>

        <n-modal v-model:show="isModalForm" :closable="false" preset="card" style="width: 900px"
            :on-after-leave="handleCancelModal">
            <UserForm @submitted="handleSubmitUserForm" after-submit="emit" :initialData="initialData" />
        </n-modal>
    </div>
</template>
<script setup lang="ts">
import BaseAdvanceFilter from '@/components/BaseAdvanceFilter.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseDatable from '@/components/BaseDatable.vue';
import BaseDatatableButton from '@/components/BaseDataTableButton.vue';
import BaseDropdown from '@/components/BaseDropdown.vue';
import { useUserTable } from '@/modules/user/composables/user.table';
import UserForm from '@/modules/user/views/UserFormView.vue';
import { TreeView } from '@vicons/carbon';
import { MoreVertical24Filled, Password16Regular } from '@vicons/fluent';
import { Create } from '@vicons/ionicons5';
import { NIcon, type DropdownOption } from "naive-ui";
import { h, onMounted, ref } from "vue";

const isModalForm = ref<boolean>(false)
const initialData = ref()

const handleSubmitUserForm = () => {
    isModalForm.value = false
    handleFetch()
}


const handleCreate = () => {
    isModalForm.value = true
}

const dropdownOptions: DropdownOption[] = [
    {
        label: "Change password",
        key: "password",
        icon: () => h(NIcon, { size: 20 }, () => h(Password16Regular))
    },
    {
        label: "Change Roles",
        key: "role",
        icon: () => h(NIcon, { size: 20 }, () => h(TreeView))
    },
]



const handleDropdown = (key: string) => {
    console.log("Selected:", key)
}


const { columns, rows, loading, search, dateRange, meta, handleFetch, handleDelete, handlePageChange, handlePageSizeChange } = useUserTable()

const handleExportModal = () => {
    alert('this feature coming soon')
}

const handleEditModal = (row: any) => {
    const roleNames = row.roleNames.map((r: any) => r.name.toLowerCase())
    initialData.value = { ...row, roleNames }
    isModalForm.value = true
}

const handleCancelModal = () => {
    initialData.value = {}
}

const handleDeleteEmployee = (row: any) => {
    handleDelete(row)
}


onMounted(async () => {
    await handleFetch()
})
</script>