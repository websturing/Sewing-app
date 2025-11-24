<template>
    <div class="flex flex-col gap-10">
        <div class="flex justify-between items-center">
            <div class="w-84 flex-auto">
                <h2 class="text-xl font-bold mb-1">{{ meta.title }}</h2>
                <p>{{ meta.description }}</p>
            </div>
            <div class="w-16 flex-auto text-right">
                <n-breadcrumb>
                    <n-breadcrumb-item><n-icon :component="SmartHome" /> Home</n-breadcrumb-item>
                    <n-breadcrumb-item>
                        <n-icon :component="ChartPerson20Filled" />
                        Leaders
                    </n-breadcrumb-item>
                </n-breadcrumb>
            </div>
        </div>

        <SummaryLeaderTable @click:unassignLine="handleUnassign" />

        <n-modal v-model:show="isModalForm" preset="card" :style="'width: 1200px'">
            <LeaderAssignmentForm v-model:modal="isModalForm" :initialData="initialData" />
        </n-modal>
    </div>
</template>
<script setup lang="ts">
import LeaderAssignmentForm from "@/modules/leaders/components/LeaderAssignmentForm.vue";
import SummaryLeaderTable from "@/modules/leaders/components/SummaryLeaderTable.vue";
import { useLeadersPage } from "@/modules/leaders/composables/leaders.page";
import type { AssignLeaderForm } from "@/modules/leaders/schemas/leaders.form.schema";
import type { MetaHead } from '@/types/metaHead';
import { ChartPerson20Filled } from "@vicons/fluent";
import { SmartHome } from '@vicons/tabler';
import { onMounted, ref } from 'vue';

const meta = ref<MetaHead>({
    title: "Leader Management Module",
    description: "A centralized interface enabling users to view, create, and maintain leader records assigned across multiple production lines. The module streamlines oversight, improves data governance, and ensures operational visibility by providing a structured workflow for leader placement and line assignments."
})

const isModalForm = ref<boolean>(false)
const initialData = ref<AssignLeaderForm>()

const {
    fetchSummaryByLeader
} = useLeadersPage()

const handleUnassign = (val: any) => {
    isModalForm.value = true
    initialData.value = {
        userId: val.leaderId,
        lineId: val.activeLineIds.split(',').map(Number),
        isActive: val.isActive
    }
}

onMounted(async () => {
    await fetchSummaryByLeader()
})
</script>