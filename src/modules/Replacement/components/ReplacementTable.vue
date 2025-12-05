<template>
    <div class="flex flex-col gap-5">
        <BaseFilter v-model:modelValue="search" @update:model-value="" @click:export=""
            @click:refresh=" handleFetchReplacementListPagination(true, {})" @input="handleInput">

            <template #actions>
                <BaseButton label="Create Request Replacement" :icon="Repeat" type="primary"
                    @click="handleCreateRoute" />
            </template>
        </BaseFilter>


        <BaseDatable :columns="columns" :data="rows" :loading="isLoading">
            <template #actions="{ row, index }">
                <BaseButton label="Detail" :icon="FolderDetails" :tertiary="true" type="primary"
                    @click="isDetailModal = true, selectReplacementItem(index)" />
            </template>
        </BaseDatable>

        <div class="flex justify-end mt-4">
            <n-pagination :page="meta.currentPage" :page-size="meta.perPage" :page-count="meta.lastPage"
                show-size-picker :page-sizes="[5, 10, 20, 50]"
                @update:page="(val: any) => handleFetchReplacementListPagination(false, { page: val, perPage: meta.perPage })"
                @update:page-size="(val: any) => handleFetchReplacementListPagination(false, { perPage: val })" />
        </div>



        <n-modal v-model:show="isDetailModal" preset="card" :style="'width: 1200px'"
            :title="`TICKET NO  : ${selectedReplacementItem?.serialNumber?.toString()}`">
            <div v-if="selectedReplacementItem">
                <ReplacementTicketDetail :data="selectedReplacementItem" />
            </div>
        </n-modal>
    </div>
</template>
<script setup lang="ts">
import ReplacementTicketDetail from '@/modules/Replacement/components/ReplacementTicketDetail.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseFilter from '@/components/BaseFilter.vue';
import BaseDatable from '@/components/BaseDatable.vue';
import { Repeat } from "@vicons/ionicons5";
import { useReplacementPage } from "@/modules/Replacement/composables/replacement.page";
import { FolderDetails } from "@vicons/carbon";
import type { DataTableColumns } from 'naive-ui';
import { NTag } from 'naive-ui';
import { onMounted, ref, h } from "vue";
import { useRouter } from 'vue-router';


const router = useRouter()
const isDetailModal = ref<boolean>(false)
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
        title: 'Status',
        key: 'status.name',
        width: 100,
        align: 'center',
        render: (row: any) => {
            return h(
                NTag,
                {
                    type: row.status.type,
                    bordered: true,
                    strong: true,
                    size: 'small'
                },
                {
                    default: () => row.status.name
                }
            )
        }
    },
    {
        title: 'Defect Qty',
        key: 'defectTotal',
        width: 100,
        align: 'center',
    },
    {
        title: 'Location',
        key: 'workflow',
        className: 'text-blue-600 font-semibold',
        width: 200,
        ellipsis: {
            tooltip: true
        },
        render: (row: any) => {
            return h(
                'div',
                {
                    class: "text-xs",
                    style: {
                        background: row.workflow.color,
                        padding: '4px 8px',
                        borderRadius: '3px'
                    }
                },
                {
                    default: () => row.workflow.current
                }
            )
        }
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
    selectedReplacementItem,
    handleFetchReplacementListPagination,
    handleSearchReplacementList,
    selectReplacementItem,
} = useReplacementPage()

const handleInput = () => {
    handleSearchReplacementList()
}

const handleCreateRoute = () => {
    router.push({
        name: 'replacement-form'
    })
}



onMounted(() => {
    handleFetchReplacementListPagination(false, {})
})
</script>
