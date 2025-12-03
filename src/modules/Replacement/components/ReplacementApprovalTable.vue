<template>
    <div class="flex flex-col gap-5">
        <BaseFilter v-model:modelValue="search" @update:model-value="" @click:export=""
            @click:refresh=" handleFetchReplacementApprovalPagination(true, {})" @input="handleInput">

            <template #actions>

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
                @update:page="(val: any) => handleFetchReplacementApprovalPagination(false, { page: val, perPage: meta.perPage })"
                @update:page-size="(val: any) => handleFetchReplacementApprovalPagination(false, { perPage: val })" />
        </div>


    </div>
</template>
<script setup lang="ts">
import WorkflowTimeline from '@/modules/Workflow/components/WorkflowTimeline.vue';
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
    }, {
        title: 'Line',
        key: 'lineNames',
        width: 100,
        align: 'center',
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
        title: 'Requested By',
        key: 'requestedBy',
        width: 250,
    },
    {
        title: 'Location',
        key: 'workflow',
        className: 'text-blue-600 font-semibold',
        width: 250,
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
    loadingWorkflow,
    workflowWithSteps,
    handleSearchReplacementApprovalList,
    handleFetchReplacementApprovalPagination,
    selectReplacementItem,
} = useReplacementPage()

const handleInput = () => {
    handleSearchReplacementApprovalList()
}

const handleCreateRoute = () => {
    router.push({
        name: 'replacement-form'
    })
}



onMounted(() => {
    handleFetchReplacementApprovalPagination(true, {})
})
</script>
