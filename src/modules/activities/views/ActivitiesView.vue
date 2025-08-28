<template>
    <div class="flex flex-col gap-5">
        <div class="flex justify-between items-center">
            <div class="w-64 flex-auto">
                <h2 class="text-xl font-bold mb-1">Audit Trail</h2>
                <p>This module records, stores, and displays all user activities within the application. Key actions
                    such as
                    login, data updates, entity creation or deletion, and administrative operations are logged in detail
                    to
                    support auditing, monitoring, and system security.</p>
            </div>
            <div class="w-36 flex-auto text-right">
                <n-breadcrumb>
                    <n-breadcrumb-item><n-icon :component="HomeOutline" /> Home</n-breadcrumb-item>
                    <n-breadcrumb-item>
                        <n-icon :component="AnalyticsOutline" /> Audit Trails
                    </n-breadcrumb-item>
                </n-breadcrumb>
            </div>
        </div>

        <ActivitiesSearchAdvanced @refresh="handleRefresh" />
        <BaseSearch v-model="search" v-model:dateRange="dateRange" v-model:year="selectedYear"
            @click:export="handleExportModal" />
        <ActivitiesTimeLine />

        {{ dateRange }} /{{ selectedYear }}

    </div>
</template>

<script setup lang="ts">
import BaseSearch from '@/components/BaseAdvanceFilter.vue';
import { currentActualYear } from "@/lib/date-helpers";
import ActivitiesSearchAdvanced from '@module/activities/components/ActivitiesSearchAdvanced.vue';
import ActivitiesTimeLine from '@module/activities/components/ActivitiesTimeLine.vue';
import { useHead } from '@unhead/vue';
import { AnalyticsOutline, HomeOutline } from '@vicons/ionicons5';
import { onMounted, ref, watch } from 'vue';
import { useActivities } from '../composables/useActivities';

import { formatDateRangeYMD } from "@/lib/dateRangeFormaterNaive";

const { search, isFirstLoad, handleFetchActivity } = useActivities()
const dateRange = ref<[number, number] | null>(null);
const selectedYear = ref(currentActualYear)
const dateFrom = ref<string | null>(null)
const dateTo = ref<string | null>(null)

const handleExportModal = () => {
    alert()
}

const handleRefresh = async () => {
    isFirstLoad.value = true
    await handleFetchActivity();
}

watch(dateRange, (val) => {
    if (val) {
        const formatted = formatDateRangeYMD(val);
        if (formatted) {
            dateFrom.value = formatted[0];
            dateTo.value = formatted[1];
            handleFetchActivity({
                dateFrom: formatted[0],
                dateTo: formatted[1],
            })
        } else {
            dateFrom.value = null;
            dateTo.value = null;
        }
    } else {
        dateFrom.value = null;
        dateTo.value = null;
    }
});


onMounted(async () => {
    await handleFetchActivity()
})

useHead({
    title: `Audit Trail`,
    meta: [
        { name: 'description', content: 'This module records, stores, and displays all user activities within the application. Key actions such as login, data updates, entity creation or deletion, and administrative operations are logged in detail to support auditing, monitoring, and system security.' }
    ]
})
</script>