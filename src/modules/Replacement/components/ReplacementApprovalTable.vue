<template>
    <div class="flex flex-col gap-5">
        <BaseFilter v-model:modelValue="search" @update:model-value="" @click:export=""
            @click:refresh=" handleFetchReplacementApprovalPagination(true, {})" @input="handleInput">

            <template #actions>

            </template>
        </BaseFilter>

        <BaseTable :isLoading="isLoading" :columns="columns" :rows="rows" :meta="meta" size="small"
            @update:page="(page, perPage) => handleFetchReplacementApprovalPagination(false, { page, perPage })"
            @update:page-size="(page, perPage) => handleFetchReplacementApprovalPagination(false, { page, perPage })">
            <template #requestItem="{ row }">
                <div class="flex flex-col ">
                    <p
                        class="inline-flex items-center bg-teal-500 px-2 py-0.5 rounded font-semibold text-gray-50 text-xs w-fit">
                        {{ row.glNo }}
                    </p>
                    <p>{{ row.colors }}</p>
                </div>
            </template>
            <template #actions>
                <BaseButton label="Review Request" :icon="FolderDetails" :tertiary="true" type="primary" @click="" />
            </template>
        </BaseTable>
    </div>
</template>
<script setup lang="ts">
import BaseTable from '@/components/BaseTable.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseFilter from '@/components/BaseFilter.vue';
import { useReplacementPage } from "@/modules/Replacement/composables/replacement.page";
import { FolderDetails } from "@vicons/carbon";
import { onMounted, ref } from "vue";
import { useRouter } from 'vue-router';


const router = useRouter()
const isDetailModal = ref<boolean>(false)
const columns = [
    {
        key: "no",
        title: "No",
        classTh: "!text-center bg-red-200"
    },
    {
        key: "requestItem",
        title: "Request Item"
    },
    {
        key: "defectSizes",
        title: "Sizes"
    },
    {
        key: "defectTotal",
        title: "Defect Qty",
        width: 30,
        classTh: "text-center",
        classRow: "text-center bg-red-400 px-2 py-0.5 rounded font-semibold text-gray-50"
    },
    {
        key: "lineNames",
        title: "Lines",
        isJoinArray: true,
        classTh: "!text-center",
        classRow: "text-center"
    },
    {
        key: "actions",
        title: "Actions"
    }
]


const {
    meta,
    isLoading,
    searchReplacementList: search,
    replacementListFilter: rows,
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
