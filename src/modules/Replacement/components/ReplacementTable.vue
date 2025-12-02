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
            :title="`GL-${selectedReplacementItem?.glNo?.toString()}`">
            <div class="flex flex-col gap-5">
                <div>
                    <table class="!w-[100%]">
                        <tr>
                            <td class="!w-[100px]">Request By</td>
                            <td>&nbsp; : &nbsp;</td>
                            <td class="!text-blue-600 font-semibold">{{ selectedReplacementItem?.requestedBy }}</td>

                            <td>Current Location</td>
                            <td>&nbsp; : &nbsp;</td>
                            <td class="!text-blue-600 font-semibold">{{
                                selectedReplacementItem?.workflow?.current }}
                            </td>
                        </tr>
                        <tr>
                            <td class="!w-[100px]">Request Date</td>
                            <td>&nbsp; : &nbsp;</td>
                            <td>{{ selectedReplacementItem?.createdAt }}</td>

                            <td>Status</td>
                            <td>&nbsp; : &nbsp;</td>
                            <td class="!font-semibold text-red-600">
                                <n-tag :type="selectedReplacementItem?.statusType" size="small">{{
                                    selectedReplacementItem?.statusName }}</n-tag>
                            </td>


                        </tr>
                        <tr>
                            <td class="!w-[100px]">Last Updated</td>
                            <td>&nbsp; : &nbsp;</td>
                            <td>{{ selectedReplacementItem?.updatedAt }}</td>

                        </tr>

                    </table>
                </div>
                <div class="bg-gray-50 border border-gray-200 p-3 rounded-lg flex flex-col gap-10">
                    <n-table v-for="e in selectedReplacementItem?.defectList">
                        <thead>
                            <tr>
                                <th class="!bg-white">Color</th>
                                <th :colspan="(e.sizeList.length ?? 0) + 1"
                                    class="!text-center !bg-white !text-blue-600 !font-semibold">
                                    {{ e.color }}
                                </th>
                            </tr>
                            <tr>
                                <th class="!bg-white">Size</th>
                                <th v-for="s in e.sizeList" class="!text-center !bg-white">{{ s.size }}
                                </th>
                                <th class="!bg-white !text-center ">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Defect</td>
                                <td v-for="s in e.sizeList" class="!text-center !text-red-400">{{ s.defectQty }}</td>
                                <td class="!text-center !font-bold !text-red-400">
                                    {{ e.totalDefect }}
                                </td>
                            </tr>
                        </tbody>
                    </n-table>

                </div>

                <div v-if="selectedReplacementItem">
                    <n-scrollbar style="max-height: 320px">
                        <WorkflowTimeline :workflow="workflowWithSteps"
                            :currentStep="selectedReplacementItem.currentStep" :isLoading="loadingWorkflow" />

                    </n-scrollbar>

                </div>


            </div>
        </n-modal>
    </div>
</template>
<script setup lang="ts">
import WorkflowTimeline from '@/modules/Workflow/components/WorkflowTimeline.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseFilter from '@/components/BaseFilter.vue';
import BaseDatable from '@/components/BaseDatable.vue';
import { Repeat, SearchOutline } from "@vicons/ionicons5";
import { useReplacementPage } from "@/modules/Replacement/composables/replacement.page";
import { FolderDetails } from "@vicons/carbon";
import type { DataTableColumns } from 'naive-ui';
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
    },
    {
        title: 'Status',
        key: 'statusName',
        width: 100,
        align: 'center',
        cellProps: (row: any) => ({
            class: row.statusClass
        }),
        render: (row: any) => row.statusName
    }
    , {
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
    selectedReplacementItem,
    loadingWorkflow,
    workflowWithSteps,
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
