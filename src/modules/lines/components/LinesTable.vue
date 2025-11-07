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

        <BaseDatable :columns="columns" :data="rows" :loading="loading">
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
import { ref } from 'vue';
import { SearchOutline, Create } from "@vicons/ionicons5";
import { RefreshRound } from "@vicons/material";


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
]
const {
    loading,
    rows,
    meta,
    handlePageChange,
    handlePageSizeChange,
    handleRefresh
} = useLineTable()
</script>