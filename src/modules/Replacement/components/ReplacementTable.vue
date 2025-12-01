<template>
    <div class="flex flex-col gap-5">
        <BaseFilter v-model:modelValue="search" @update:model-value="" @click:export=""
            @click:refresh=" handleFetchReplacementListPagination(true, {})" @input="handleInput">

            <template #actions>
                <BaseButton label="Create Request Replacement" :icon="Repeat" type="primary" />
            </template>
        </BaseFilter>


        <BaseDatable :columns="columns" :data="rows" :loading="isLoading">
            <template #actions="{ row, index }">
                <BaseButton label="Detail" :icon="FolderDetails" :tertiary="true" type="primary"
                    @click="selectReplacementItem(index)" />
            </template>
        </BaseDatable>

        <div class="flex justify-end mt-4">
            <n-pagination :page="meta.currentPage" :page-size="meta.perPage" :page-count="meta.lastPage"
                show-size-picker :page-sizes="[5, 10, 20, 50]"
                @update:page="(val: any) => handleFetchReplacementListPagination(false, { page: val, perPage: meta.perPage })"
                @update:page-size="(val: any) => handleFetchReplacementListPagination(false, { perPage: val })" />
        </div>

        <div class="flex flex-col gap-5">
            <p class="font-bold text-2xl">GL-{{ selectedReplacementItem?.glNo }}</p>
            <div>
                <table class="!w-[100%]">
                    <tr>
                        <td class="!w-[100px]">Request By</td>
                        <td>&nbsp; : &nbsp;</td>
                        <td class="!text-blue-600 font-semibold">{{ selectedReplacementItem?.requestedBy }}</td>

                        <td class="!w-[100px]">Line Names</td>
                        <td>&nbsp; : &nbsp;</td>
                        <td class="!text-blue-600 font-semibold !w-[400px]">{{
                            selectedReplacementItem?.lineNames.join(',') }}
                        </td>

                        <td>Current Location</td>
                        <td>&nbsp; : &nbsp;</td>
                        <td class="!text-blue-600 font-semibold">{{
                            selectedReplacementItem?.workflow?.next }}
                        </td>
                    </tr>
                    <tr>
                        <td class="!w-[100px]">Request Date</td>
                        <td>&nbsp; : &nbsp;</td>
                        <td>{{ selectedReplacementItem?.createdAt }}</td>

                        <td>Total Defect</td>
                        <td>&nbsp; : &nbsp;</td>
                        <td class="!font-semibold text-red-600">{{ selectedReplacementItem?.defectTotal }}</td>

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


                        <td>Total size</td>
                        <td>&nbsp; : &nbsp;</td>
                        <td class="!text-semibold">{{ selectedReplacementItem?.totalSize }}</td>
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
                <div>
                    <p class="mb-5 font-bold">Workflow Replacement {{ loadingWorkflow }}</p>
                    <n-timeline>
                        <n-timeline-item content="Oops" />
                        <n-timeline-item type="success" title="Success" content="success content"
                            time="2018-04-03 20:46" />
                        <n-timeline-item type="error" content="Error content" time="2018-04-03 20:46" />
                        <n-timeline-item type="warning" title="Warning" content="warning content"
                            time="2018-04-03 20:46" />
                        <n-timeline-item type="info" title="Info" content="info content" time="2018-04-03 20:46"
                            line-type="dashed" />
                        <n-timeline-item content="Oops" />
                    </n-timeline>
                </div>
            </div>


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
    selectedReplacementItem,
    loadingWorkflow,
    handleFetchReplacementListPagination,
    handleSearchReplacementList,
    selectReplacementItem,
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