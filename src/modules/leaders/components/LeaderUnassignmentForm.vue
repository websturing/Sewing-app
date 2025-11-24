<template>
    <div>
        <div class="bg-gray-50 border border-gray-200 p-3 rounded-lg">
            <p class="text-lg font-semibold  mb-5">{{ data?.leader }}</p>
            <p class="text-xs font-semibold text-gray-400">Assignment Lines</p>
            <n-divider dashed class="!my-[10px]" />
            <n-list bordered>
                <n-list-item v-for="(e, index) in data?.activeDetail"
                    :class="index === selectedIdx ? 'dimmed' : 'dimmed'">
                    {{ e?.lineName }}
                    <template #suffix>
                        <BaseButton label="unassign line" size="small" :icon="Trash" type="error" :loading="isLoading"
                            @click="handleUnassign(index, e.assignId)" :disabled="index == selectedIdx" />
                    </template>
                </n-list-item>
            </n-list>
        </div>
    </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import { useLeadersForm } from '@/modules/leaders/composables/leaders.form';
import type { AssignmentSummaryByLeader } from '@/modules/leaders/schemas/leaders.api.schema';
import { Trash } from '@vicons/tabler';
import { ref } from 'vue';

const { initialData: data } = defineProps<{
    initialData?: AssignmentSummaryByLeader
}>()

const selectedIdx = ref<number | null>(null)

const {
    isLoading,
    handleUnassignLeader
} = useLeadersForm()

const handleUnassign = async (idx: number, id: number) => {
    selectedIdx.value = idx
    await handleUnassignLeader({
        id: id
    })
    data?.activeDetail.splice(idx, 1)
    selectedIdx.value = null
}



</script>