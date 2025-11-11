<template>
    <div class="flex flex-col gap-3">
        <div class="flex justify-between items-center">
            <p class="font-semibold">Attendance List | {{ date }}</p>
            <div class="flex gap-2 justify-end">
                <BaseInput :icon="SearchOutline" placeholder="Search" v-model="search" />
                <BaseButton label="Refresh" :icon="RefreshRound" @click="emit('click:refresh')" />
            </div>
        </div>
        <n-table :class="{
            'bg-yellow-200 ring-2 ring-yellow-400': isHighlighted,
            'bg-white': !isHighlighted,
        }">
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>Employee Name</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Check-in Time</th>
                    <th>Check-out Time</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="!isLoading">
                    <tr v-for="i in data" :key="i.id">
                        <td>{{ i.employeeCode }}</td>
                        <td>{{ i.userName }}</td>
                        <td>{{ i.attendanceDate }}</td>
                        <td>{{ i.status }}</td>
                        <td>{{ i.checkInTime || 'N/A' }}</td>
                        <td>{{ i.checkOutTime || 'N/A' }}</td>
                    </tr>
                </template>
                <template v-else>
                    <tr>
                        <td colspan="6" class="!text-center py-5">
                            Loading...
                        </td>
                    </tr>
                </template>

            </tbody>
        </n-table>
    </div>
</template>
<script lang="ts" setup>
import BaseButton from "@/components/BaseButton.vue";
import BaseInput from "@/components/BaseInput.vue";
import type { attendanceGroupLine } from "@/modules/attendances/schemas/attendances.api";
import { SearchOutline } from "@vicons/ionicons5";
import { RefreshRound } from "@vicons/material";
import dayjs from 'dayjs';
import { computed, ref, watch } from "vue";

interface Props {
    groupLine: attendanceGroupLine[],
    isLoading: boolean,
    highlightTrigger?: number | boolean
}

const date = dayjs(new Date()).format('MMMM DD, YYYY');
const search = ref<string>('');

const props = withDefaults(defineProps<Props>(), {
    isLoading: true
})

const emit = defineEmits<{
    (e: 'click:refresh'): void
}>()



const data = computed(() => {
    if (!search.value) {
        return props.groupLine;
    }
    return props.groupLine.filter((item) =>
        item.userName.toLowerCase().includes(search.value.toLowerCase()) ||
        item.employeeCode.toLowerCase().includes(search.value.toLowerCase())
    );
});

const isHighlighted = ref(false)
watch(
    () => props.highlightTrigger,
    () => {
        // setiap kali trigger berubah (meskipun nilainya sama)
        isHighlighted.value = true
        setTimeout(() => {
            isHighlighted.value = false
        }, 800)
    },
    { immediate: false }
)

</script>