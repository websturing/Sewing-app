<template>
    <div class="flex flex-col gap-5">
        <BaseFilter v-model:modelValue="search" @update:model-value="" @click:export=""
            @click:refresh=" handleFetchReplacementListPagination(true, {})" @input="handleInput">

            <template #actions>
                <BaseButton label="Create Request Replacement" :icon="Repeat" type="primary" />
            </template>
        </BaseFilter>


        <BaseDatable :columns="columns" :data="rows" :loading="isLoading">
            <template #actions="{ row }">
                <BaseButton label="Detail" :icon="FolderDetails" :tertiary="true" type="primary" @click="" />
            </template>
        </BaseDatable>

        <div class="flex justify-end mt-4">
            <n-pagination :page="meta.currentPage" :page-size="meta.perPage" :page-count="meta.lastPage"
                show-size-picker :page-sizes="[5, 10, 20, 50]"
                @update:page="(val: any) => handleFetchReplacementListPagination(false, { page: val, perPage: meta.perPage })"
                @update:page-size="(val: any) => handleFetchReplacementListPagination(false, { perPage: val })" />
        </div>


    </div>
</template>
<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import BaseFilter from '@/components/BaseFilter.vue';
import BaseDatable from '@/components/BaseDatable.vue';
import { Repeat, SearchOutline } from "@vicons/ionicons5";
import { useReplacementPage } from "@/modules/Replacement/composables/replacement.page";
import { FolderDetails } from "@vicons/carbon";
import type { DataTableColumns } from 'naive-ui';
import { onMounted, ref } from "vue";

const columns: DataTableColumns<any> = [
    {
        title: 'No',
        key: 'index',
        align: 'center',
        width: 50,
        render: (_row: any, index: number) => {
            return (meta.value.currentPage - 1) * meta.value.perPage + index + 1
        }
    },
    {
        title: 'Serial Number',
        key: 'serialNumber',
        width: 150,
        ellipsis: {
            tooltip: true
        },
    },
    {
        title: 'GL Number',
        key: 'glNo',
        width: 100,
        align: 'center',
    },
    {
        title: 'Colors',
        key: 'colors',
        ellipsis: {
            tooltip: true
        }
    },
    {
        title: 'Line',
        key: 'lineNames',
        width: 100,
        render: (row: any) => {
            // Pastikan row.lineNames adalah array sebelum di-join
            if (Array.isArray(row.lineNames)) {
                return row.lineNames.join(", ")
            }
            // Jika bukan array, kembalikan nilai aslinya atau string kosong
            return row.lineNames || '-'
        }
    },
    {
        title: 'Defect Qty',
        key: 'defectTotal',
        width: 100,
        align: 'center',
    },
    {
        title: 'Last Updated',
        key: 'updatedAt',
        width: 200,
        align: 'center',
    },
    {
        title: 'Actions',
        key: 'actions',
        width: 150,

    }
]


const {
    meta,
    isLoading,
    searchReplacementList: search,
    replacementListFilter: rows,
    handleFetchReplacementListPagination,
    handleSearchReplacementList
} = useReplacementPage()

const handleInput = () => {
    handleSearchReplacementList()
}

onMounted(() => {
    handleFetchReplacementListPagination(false, {})
})
</script>
<style lang="css" scooped>
.n-tabs .n-tabs-nav.n-tabs-nav--card-type .n-tabs-tab.n-tabs-tab--active {
    background-color: #eff6ff !important;
    font-weight: var(--n-tab-font-weight-active);
    color: var(--n-tab-text-color-active);
}
</style>