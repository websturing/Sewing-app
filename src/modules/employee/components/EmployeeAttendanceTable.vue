<template>
    <div class="flex flex-col gap-3">
        <div class="flex justify-between items-center">
            <p class="font-semibold">Attendance List | {{ date }}</p>
            <div class="flex gap-2 justify-end">
                <BaseInput :icon="SearchOutline" placeholder="Search" v-model="search" />
                <BaseButton label="Refresh" :icon="RefreshRound" @click="" />
            </div>
        </div>
        <n-table>
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
            <tbody></tbody>
        </n-table>
    </div>
</template>
<script lang="ts" setup>
import BaseButton from "@/components/BaseButton.vue";
import { RefreshRound } from "@vicons/material";
import BaseInput from "@/components/BaseInput.vue";
import { SearchOutline } from "@vicons/ionicons5";
import { ref } from "vue";
import dayjs from 'dayjs';

const date = dayjs(new Date()).format('MMMM DD, YYYY');
const search = ref<string>('');
</script>