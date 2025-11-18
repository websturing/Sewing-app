<template>
    <div class="flex flex-col gap-3">
        <div class="flex justify-between">
            <div>
                <BaseInput :icon="SearchOutline" placeholder="Search" v-model="search" />
            </div>
            <div class="flex gap-2">
                <BaseButton label="Refresh" :icon="RefreshRound" @click="handleRefresh" :tertiary="true"
                    type="warning" />
                <BaseButton label="Create Line" :icon="Create" @click="" :tertiary="false" type="primary" />
            </div>
        </div>

        <BaseDatable :columns="columns" :data="rowFilter" :loading="loading">
            <template #actions="{ row }">
                <div class="flex  gap-2">
                    <BaseButton label="Detail" :icon="FolderDetails" @click="navigateToDetail(row.id)" :tertiary="true"
                        type="primary" />
                </div>
            </template>
        </BaseDatable>

        <div class="flex justify-end mt-4">
            <n-pagination :page="meta.currentPage" :page-size="meta.perPage" :page-count="meta.lastPage"
                :page-sizes="[5, 10, 20, 50]" @update:page="handlePageChange"
                @update:page-size="handlePageSizeChange" />
        </div>
    </div>
</template>

<script setup lang="ts">
import BaseDatable from '@/components/BaseDatable.vue';
import BaseButton from "@/components/BaseButton.vue";
import { useLineTable } from '@/modules/lines/composables/line.table';
import { type DataTableColumns } from "naive-ui";
import { ref, computed } from 'vue';
import { SearchOutline, Create } from "@vicons/ionicons5";
import { RefreshRound } from "@vicons/material";
import type { LineApi } from '@/modules/lines/schemas/line.api.schema';
import { FolderDetails } from '@vicons/carbon';
import dayjs from "dayjs";


const search = ref<string>('');
const columns: DataTableColumns<any> = [
    {
        title: 'No',
        key: 'index',
        width: 60,
        render: (_row: any, index: number) => {
            return (meta.value.currentPage - 1) * meta.value.perPage + index + 1
        }
    },
    {
        title: 'Name',
        key: 'name',
    },
    {
        title: 'Location',
        key: 'location',
    },
    {
        title: 'Current GL Number',
        key: 'current_gl_no',
        render: (row: any) => {
            return row.latestStockin?.glNo ?? '-'
        }
    },
    {
        title: 'Color',
        key: 'color',
        render: (row: any) => {
            return row.latestStockin?.color ?? '-'
        }
    },
    {
        title: 'Last Updated',
        key: 'updatedAt',
        render: (row: any) => {
            return row.latestStockin?.updatedAt ? dayjs(row.latestStockin?.updatedAt).format('MMMM, DD YYYY HH:mm') : '-'
        }
    },
    {
        title: "Actions",
        key: "actions",
        width: 150,
    },
]

const rowFilter = computed(() => {
    if (!search.value) {
        return rows.value; // tidak ada search → pakai cache utama
    }

    // fallback → cari di data lokal sesuai search term
    const term = search.value.toLowerCase();
    return rows.value
        .filter((item: LineApi) =>
            item.name?.toLowerCase().includes(term) ||
            item.latestStockin?.glNo?.toLowerCase().includes(term) ||
            item.latestStockin?.color?.toLowerCase().includes(term)
        )
})

const {
    loading,
    rows,
    meta,
    handlePageChange,
    handlePageSizeChange,
    handleRefresh,
    navigateToDetail
} = useLineTable()
</script>