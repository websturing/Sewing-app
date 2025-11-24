<template>
    <div class="flex flex-col gap-5">
        <div class="flex justify-between">
            <div class="!w-[300px]">
                <BaseInput :icon="SearchOutline" placeholder="Search" v-model="search" />
            </div>
            <div class="flex gap-3 items-center">
                <BaseButton label="Refresh" :icon="RefreshRound" @click="handleRefresh" />
                <BaseButton label="Create Leader Assignment" :icon="ChartPerson20Filled" @click="handleRefresh"
                    type="primary" />
            </div>
        </div>
        <n-table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Leader</th>
                    <th>Line Assignments</th>
                    <th>Last Updated</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="isLoading">
                    <tr v-for="i in 10" :key="i">
                        <td> <n-skeleton text /></td>
                        <td> <n-skeleton text /></td>
                        <td> <n-skeleton text /></td>
                        <td> <n-skeleton text /></td>
                        <td> <n-skeleton text /></td>
                        <td> <n-skeleton text /></td>
                        <td> <n-skeleton text /></td>
                        <td> <n-skeleton text /></td>
                    </tr>
                </template>
                <template v-else>
                    <tr v-for="(i, index) in dataFilter" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ i.leader }}</td>
                        <td>{{ i.activeLines }}</td>
                        <td>{{ i.lastUpdated }}</td>
                        <td>
                            <BaseButton label="Detail" :icon="FolderDetailsReference" @click="" tertiary />
                        </td>
                    </tr>
                </template>
            </tbody>
        </n-table>
    </div>
</template>
<script setup lang="ts">
import BaseInput from "@/components/BaseInput.vue";
import { useLeadersPage } from '@/modules/leaders/composables/leaders.page';
import { FolderDetailsReference } from "@vicons/carbon";
import { ChartPerson20Filled } from "@vicons/fluent";
import { SearchOutline } from "@vicons/ionicons5";
import { RefreshRound } from "@vicons/material";
import { computed, ref } from "vue";
const search = ref("")


const dataFilter = computed(() => {
    const searchTerm = search.value.toLowerCase().trim()

    // Jika search kosong, return semua data
    if (!searchTerm) {
        return data.value || []
    }
    // Filter data berdasarkan GL Number dan Color
    return (data.value || []).filter(item =>
        item.leader?.toLowerCase().includes(searchTerm) ||
        item.activeLines?.toLowerCase().includes(searchTerm)
    )
})
const {
    isLoading,
    AssignmentSummaryByLeader: data,
    fetchSummaryByLeader
} = useLeadersPage()


const handleRefresh = async () => {
    await fetchSummaryByLeader()
}
</script>