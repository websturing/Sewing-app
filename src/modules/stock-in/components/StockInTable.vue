<script setup lang="ts">
import BaseAdvanceFilter from '@/components/BaseAdvanceFilter.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseDatable from '@/components/BaseDatable.vue';
import BaseDatatableButton from '@/components/BaseDataTableButton.vue';
import { useStockInTable } from '@/modules/stock-in/composables/stockIn.table';
import { QrCodeScannerSharp } from '@vicons/material';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const {
    search,
    rows,
    columns,
    loading,
    meta: tableMeta,
    handlePageChange,
    handlePageSizeChange,
    handleFetch } = useStockInTable()

const router = useRouter()
const dateRange = ref()

const handleExportModal = () => { }
const handleDelete = () => { }
const handleEdit = () => []


onMounted(() => {
    handleFetch()
})

</script>

<template>
    <div class="flex flex-col gap-5">
        <div class="flex gap-2 justify-between">
            <div class="flex-1">
                <BaseAdvanceFilter v-model="search" v-model:dateRange="dateRange" @click:export="handleExportModal"
                    @click:refresh="handleFetch" />
            </div>
            <div>
                <BaseButton label="Scan Stock In" :icon="QrCodeScannerSharp" type="primary"
                    @click="router.push({ name: 'employee-form' })" />
            </div>
        </div>

        <div>
            <BaseDatable :columns="columns" :data="rows" :loading="loading">
                <template #actions="{ row }">
                    <BaseDatatableButton :row="row" label-button-delete="Delete" @click:edit="handleEdit"
                        @click:delete="handleDelete()" />
                </template>
            </BaseDatable>
        </div>

        <div class="flex justify-end mt-4">
            <n-pagination :page="tableMeta.currentPage" :page-size="tableMeta.perPage" :page-count="tableMeta.lastPage"
                show-size-picker :page-sizes="[5, 10, 20, 50]" @update:page="handlePageChange"
                @update:page-size="handlePageSizeChange" />
        </div>
    </div>
</template>