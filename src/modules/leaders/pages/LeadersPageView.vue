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

        <SummaryLeaderTable @click:unassignLine="handleUnassign" v-model:modal="isModalForm"
            v-model:modalDetail="isModalHistory" @click:assignHistory="handleHistory" />

        <n-modal v-model:show="isModalForm" preset="card" :style="'width: 1200px'">
            <LeaderAssignmentForm v-model:modal="isModalForm" />
        </n-modal>
        <n-modal v-model:show="isModalUnassignForm" preset="card" :style="'width: 1200px'">
            <template #header>
                <p>Leader Unassignment</p>
                <p class="text-sm font-normal">An operational interface for removing a leader from a designated
                    production line.</p>
            </template>
            <template #footer>
                <div class="flex justify-end">
                    <BaseButton label="Close" type="primary" tertiary @click="isModalUnassignForm = false" />
                </div>
            </template>
            <LeaderUnassignmentForm :initialData="initialData" v-model:modal="isModalUnassignForm" />
        </n-modal>
        <n-modal v-model:show="isModalHistory" preset="card" :style="'width: 1200px'">
            <template #header>
                <p>Leader Assignment History</p>
                <p class="text-sm font-normal">A comprehensive log displaying historical leader-to-line assignments,
                    including activation and unassignment records.</p>
            </template>
            <template #footer>
                <div class="flex justify-end">
                    <BaseButton label="Close" type="primary" tertiary @click="isModalHistory = false" />
                </div>
            </template>
            <LeaderAssignmentHistory :initialData="initialData" />
        </n-modal>

    </div>
</template>
<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";
import LeaderAssignmentForm from "@/modules/leaders/components/LeaderAssignmentForm.vue";
import LeaderAssignmentHistory from "@/modules/leaders/components/LeaderAssignmentHistory.vue";
import LeaderUnassignmentForm from "@/modules/leaders/components/LeaderUnassignmentForm.vue";
import SummaryLeaderTable from "@/modules/leaders/components/SummaryLeaderTable.vue";
import { useLeadersPage } from "@/modules/leaders/composables/leaders.page";
import type { AssignmentSummaryByLeader } from "@/modules/leaders/schemas/leaders.api.schema";
import type { MetaHead } from '@/types/metaHead';
import { ChartPerson20Filled } from "@vicons/fluent";
import { SmartHome } from '@vicons/tabler';
import { onMounted, ref } from 'vue';

const meta = ref<MetaHead>({
    title: "Leader Management Module",
    description: "A centralized interface enabling users to view, create, and maintain leader records assigned across multiple production lines. The module streamlines oversight, improves data governance, and ensures operational visibility by providing a structured workflow for leader placement and line assignments."
})

const isModalForm = ref<boolean>(false)
const isModalUnassignForm = ref<boolean>(false)
const isModalHistory = ref<boolean>(false)
const initialData = ref<AssignmentSummaryByLeader>()

const {
    fetchSummaryByLeader
} = useLeadersPage()

const handleUnassign = (val: AssignmentSummaryByLeader) => {
    initialData.value = val
    isModalUnassignForm.value = true
}

const handleHistory = (val: AssignmentSummaryByLeader) => {
    initialData.value = val
    isModalHistory.value = true
}

onMounted(async () => {
    await fetchSummaryByLeader()
})
</script>