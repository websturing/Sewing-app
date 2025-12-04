<template>
    <div>
        <n-card class="shadow-xs">
            <div class="flex flex-col gap-5">
                <div class="flex justify-between">
                    <div class="flex flex-col gap-1">
                        <p class="text-xl font-bold">GL-{{ props.data.glNo }}</p>
                        <div
                            :style="{ background: props.data.workflow?.color, padding: '4px 8px', borderRadius: '3px' }">
                            <p class="text-sm">
                                Location : {{ props.data.workflow?.current }}
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <table class="text-sm">
                            <tr>
                                <td>
                                    <BaseIconWithLabel :icon="FolderPerson16Regular" label="Requested by" :size="20" />
                                </td>
                                <td>&nbsp; : &nbsp;</td>
                                <td>{{ props.data.requestedBy }}</td>
                            </tr>
                            <tr>
                                <td>
                                    <BaseIconWithLabel :icon="CalendarRtl48Regular" label="Requested Date" :size="20" />
                                </td>
                                <td>&nbsp; : &nbsp;</td>
                                <td>{{ props.data.createdAt }}</td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div>
                    <n-card class="shadow-xs border !border-gray-200">
                        <div class="flex gap-5 justify-between items-center">
                            <div class="flex gap-5 items-center">
                                <BaseIconWithLabel :icon="BrandAirtable"
                                    :label="`Line ${props.data.lineNames.join(',')}`" :size="20"
                                    labelClass="text-sm text-black font-semibold" />

                                <BaseIconWithLabel :icon="TableResizeColumn16Regular"
                                    :label="`Total Sizes : ${props.data.totalSize}`" :size="20"
                                    labelClass="text-sm text-black font-semibold" />

                                <BaseIconWithLabel :icon="CheckboxWarning20Regular"
                                    :label="`Total Defect : ${props.data.defectTotal}`" :size="19"
                                    labelClass="text-sm text-red-400 font-semibold" />

                                <BaseButton :icon="History" label="Process History" size="small"
                                    @click="handleProcessHistory" />
                            </div>
                            <div>
                                <BaseIconWithLabel :icon="IosSync" :label="`Last Updated : ${props.data.updatedAt}`"
                                    :size="19" labelClass="text-sm italic text-gray-400" />
                            </div>
                        </div>
                    </n-card>
                </div>

                <div :class="props.data.defectList.length > 1
                    ? 'grid grid-cols-1 sm:grid-cols-2 gap-4'
                    : 'grid grid-cols-1 gap-4'" class="bg-gray-50 border border-gray-200 rounded-lg p-2">
                    <div v-for="e in props.data.defectList" :key="e.color" class="!w-full !min-w-0">
                        <n-table class="!border !border-gray-200 !w-full">
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
                                    <td v-for="s in e.sizeList" class="!text-center !text-red-400">{{ s.defectQty }}
                                    </td>
                                    <td class="!text-center !font-bold !text-red-400">
                                        {{ e.totalDefect }}
                                    </td>
                                </tr>
                            </tbody>
                        </n-table>
                    </div>
                </div>
            </div>
        </n-card>

        <n-modal v-model:show="isProcessHistoryModal" preset="card" :style="'width: 600px'"
            :title="`GL-${props.data.glNo?.toString()}`">
            <WorkflowTimeline :workflow="timelineHistories" :currentStep="props.data.currentStep"
                :isLoading="isLoading" />
        </n-modal>
    </div>
</template>
<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import BaseIconWithLabel from '@/components/BaseIconWithLabel.vue';
import { useReplacementPage } from "@/modules/Replacement/composables/replacement.page";
import type { ReplacementItem } from '@/modules/Replacement/schemas/replacement.api.schema';
import WorkflowTimeline from '@/modules/Workflow/components/WorkflowTimeline.vue';
import { CalendarRtl48Regular, CheckboxWarning20Regular, FolderPerson16Regular, TableResizeColumn16Regular } from '@vicons/fluent';
import { IosSync } from '@vicons/ionicons4';
import { BrandAirtable, History } from '@vicons/tabler';
import { ref } from "vue";

interface Props {
    data: ReplacementItem
    isLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    isLoading: false
})


const isProcessHistoryModal = ref<boolean>(false)

const {
    timelineHistories,
    isLoading,
    handleFetchHistoriesByReplacementId
} = useReplacementPage()


const handleProcessHistory = async () => {
    isProcessHistoryModal.value = true
    handleFetchHistoriesByReplacementId(true, props.data.id as number)

}

</script>
