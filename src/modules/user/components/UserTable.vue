<template>
    <div class="flex flex-col gap-5">
        <div class="flex gap-10">
            <div class="flex-1">
                <BaseAdvanceFilter v-model="search" v-model:dateRange="dateRange" @click:export="handleExportModal"
                    @click:refresh="handleFetch" />
            </div>
            <div class="">
                <BaseButton label="Create User" :icon="Create" type="primary"
                    @click="router.push({ name: 'employee-form' })" />
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
                show-size-picker :page-sizes="[5, 10, 20, 50]" @update:page="handlePageChange"
                @update:page-size="handlePageSizeChange" />
        </div>
    </div>
</template>
<script setup lang="ts">
import BaseAdvanceFilter from '@/components/BaseAdvanceFilter.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseDatable from '@/components/BaseDatable.vue';
import BaseDatatableButton from '@/components/BaseDataTableButton.vue';
import BaseDropdown from '@/components/BaseDropdown.vue';
import { useUserTable } from '@/modules/user/composables/user.table';
import { MoreVertical24Filled } from '@vicons/fluent';
import { Create } from '@vicons/ionicons5';
import type { DropdownOption } from "naive-ui";
import { onMounted } from "vue";
import { useRouter } from 'vue-router';

const dropdownOptions: DropdownOption[] = [
    {
        label: "Change password",
        key: "password",
    },
]

const handleDropdown = (key: string) => {
    console.log("Selected:", key)
}

const router = useRouter()

const { columns, rows, loading, search, dateRange, meta, handleFetch, handlePageChange, handlePageSizeChange } = useUserTable()

const handleExportModal = () => {
    alert('this feature coming soon')
}

const handleEditModal = (row: any) => {
    alert();
}

const handleDeleteEmployee = (row: any) => {
    alert();
}


onMounted(async () => {
    await handleFetch()
})
</script>