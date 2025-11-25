<template>
    <div>
        <div class="bg-gray-50 border border-gray-200 p-3 rounded-lg">
            <p class="text-gray-400 font-semibold">Leader Name</p>
            <p class="text-lg font-semibold  mb-2">{{ data?.leader.toUpperCase() }}</p>

            <div class="flex gap-2 mb-5">
                <BaseButton v-for="i in data?.activeLines.split(',')" :label="i" classContent="!bg-green-200" />
            </div>



            <p class="text-xs font-semibold text-gray-400 mb-3">History Assignments</p>
            <n-table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Line</th>
                        <th>Assign At</th>
                        <th>Unassign At</th>
                        <th>Created By</th>
                        <th>Updated By</th>
                        <th class="!text-center">Active</th>
                        <th>Last Updated</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(e, index) in data?.activeDetail">
                        <td>{{ index + 1 }}</td>
                        <td>{{ e.lineName }}</td>
                        <td>{{ e.assignAt }}</td>
                        <td>{{ e.unassignAt ?? '-' }}</td>
                        <td>{{ e.createdBy }}</td>
                        <td>{{ e.updatedBy ?? '-' }}</td>
                        <td class="!bg-green-200 !text-center">Active</td>
                        <td>{{ e.lastUpdated }}</td>
                    </tr>
                    <tr v-for="(e, index) in data?.inactiveDetail">
                        <td>{{ index + 1 }}</td>
                        <td>{{ e.lineName }}</td>
                        <td>{{ e.assignAt }}</td>
                        <td>{{ e.unassignAt ?? '-' }}</td>
                        <td>{{ e.createdBy }}</td>
                        <td>{{ e.updatedBy ?? '-' }}</td>
                        <td class="!bg-red-200 !text-center">Inactive</td>
                        <td>{{ e.lastUpdated }}</td>
                    </tr>
                </tbody>
            </n-table>

        </div>
    </div>
</template>

<script setup lang="ts">
import { useLeadersForm } from '@/modules/leaders/composables/leaders.form';
import { useLeadersPage } from "@/modules/leaders/composables/leaders.page";
import type { AssignmentSummaryByLeader } from '@/modules/leaders/schemas/leaders.api.schema';
import { ref } from 'vue';

const { initialData: data } = defineProps<{
    initialData?: AssignmentSummaryByLeader
    modal?: boolean
}>()

const emit = defineEmits<{
    'update:modal': [value: boolean]
}>()

const selectedIdx = ref<number | null>(null)

const {
    isLoading,
    handleUnassignLeader
} = useLeadersForm()
const {
    fetchSummaryByLeader
} = useLeadersPage()

const updateModalValue = (value: boolean) => {
    emit('update:modal', value)
}

const handleUnassign = async (idx: number, id: number) => {
    selectedIdx.value = idx
    await handleUnassignLeader({
        id: id
    })
    data?.activeDetail.splice(idx, 1)
    selectedIdx.value = null
    await fetchSummaryByLeader()
    updateModalValue(false)
}



</script>