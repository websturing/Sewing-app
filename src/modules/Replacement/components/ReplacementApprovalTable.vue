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
            <template #actions="{ index }">
                <BaseButton label="Review Request" :icon="FolderDetails" :tertiary="true" type="primary"
                    @click="isDetailModal = true, selectReplacementItem(index), note = null" />
            </template>
        </BaseTable>

        <n-modal v-model:show="isDetailModal" preset="card" :style="'width: 1200px'"
            :title="`Approval Replacement Request`">
            <div class="flex flex-col gap-3">
                <n-card class="!shadow !border !border-gray-300">
                    <div class="flex flex-col gap-5">
                        <div class="flex flex-col gap-2">
                            <label class="font-semibold">Note</label>
                            <n-input v-model:value="note" type="textarea"
                                placeholder="Provide additional details if needed" />
                        </div>
                        <div class="flex gap-2">
                            <BaseButton label="Reject" :icon="Close" type="error" />
                            <BaseButton label="Approve" :icon="CheckmarkDone" type="success" />
                        </div>
                    </div>
                </n-card>
                <n-scrollbar style="max-height: 450px">
                    <div v-if="selectedReplacementItem">
                        <ReplacementTicketDetail :data="selectedReplacementItem" />
                    </div>
                </n-scrollbar>
            </div>
        </n-modal>
    </div>
</template>
<script setup lang="ts">
import ReplacementTicketDetail from '@/modules/Replacement/components/ReplacementTicketDetail.vue';
import BaseTable from '@/components/BaseTable.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseFilter from '@/components/BaseFilter.vue';
import { useReplacementPage } from "@/modules/Replacement/composables/replacement.page";
import { FolderDetails } from "@vicons/carbon";
import { onMounted, ref } from "vue";
import { useRouter } from 'vue-router';
import { CheckmarkDone, Close } from '@vicons/ionicons5';


const router = useRouter()
const note = ref<string | null>(null)
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
    selectedReplacementItem,
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
