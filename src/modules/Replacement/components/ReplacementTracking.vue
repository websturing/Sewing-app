<template>
    <div class="flex flex-col gap-5">
        <n-card class="!bg-gray-50 !border !border-gray-200">
            <div>
                <BaseInput v-model="serialNumber" :icon="Search" placeholder="Search Replacement Request"
                    @enter="handleEnter" :loading="isLoading" />
            </div>
        </n-card>

        <div>
            <p class="font-semibold text-lg">Replacement Request Workflow</p>
            <p>Track the steps and status for Ticket : {{ serialNumber }}</p>
            <p>{{ error }}</p>
        </div>
        <WorkflowTimelineCard :workflow="workflow" :isLoading="isLoading" :currentStep="2" />
    </div>
</template>
<script setup lang="ts">
import BaseInput from '@/components/BaseInput.vue';
import WorkflowTimelineCard from '@/modules/Workflow/components/WorkflowTimelineCard.vue';
import { Search } from '@vicons/ionicons5';
import { ref } from 'vue';
import { useReplacementTracking } from '../composables/replacement.tracking';
const serialNumber = ref<string | null>("SWA-REPLACEMENT-20251208141755-65830-01")


const { isLoading, error, fetchTrackingData, workflow } = useReplacementTracking();

const handleEnter = () => {
    fetchTrackingData(serialNumber.value || '',)
}


</script>