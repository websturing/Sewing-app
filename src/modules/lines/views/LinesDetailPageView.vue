<template>
    <div class="flex flex-col gap-5">
        <n-card>
            <div class="flex flex-col gap-10">
                <div class="flex items-center gap-4">
                    <div class="bg-blue-50 pl-3 pr-3 pt-3 pb-2 rounded-xl">
                        <n-icon size="48">
                            <BrandAirtable />
                        </n-icon>
                    </div>
                    <div class="flex flex-col gap-2">
                        <p class="text-xl font-bold"> Line {{ line?.name }}</p>
                        <div class="flex gap-4 items-center">
                            <div class="flex gap-2 items-center bg-gray-100 px-4  rounded-lg">
                                <n-icon size="14" class="text-gray-700">
                                    <LocationFilled />
                                </n-icon>
                                <p class="text-gray-700">{{ line?.location }}</p>
                            </div>
                            <div class="flex gap-2 items-center  bg-teal-100 px-4 rounded-lg">
                                <n-icon size="16" class="text-green-800">
                                    <OnlinePredictionFilled />
                                </n-icon>
                                <p class="text-teal-700">Online</p>
                            </div>
                        </div>

                    </div>
                    <div class="w-16 flex-auto text-right">
                        <n-breadcrumb>
                            <n-breadcrumb-item><n-icon :component="SmartHome" /> Home</n-breadcrumb-item>
                            <n-breadcrumb-item>
                                <n-icon :component="BrandAirtable" />
                                Lines
                            </n-breadcrumb-item>
                        </n-breadcrumb>
                    </div>
                </div>
                <div class="flex gap-1">
                    <BaseButton :icon="ShiftsActivity20Filled">Attendances</BaseButton>
                    <BaseButton :icon="ChartPerson20Filled">Leaders</BaseButton>
                    <BaseButton :icon="History">History GL Numbers</BaseButton>
                    <BaseButton :icon="Devices">Devices</BaseButton>
                </div>
            </div>
        </n-card>
        <n-card class="shadow-sm">
            <div class=" flex flex-col gap-5">
                <div class="flex gap-5 items-end">
                    <div class="flex-1">
                        <LineGlSummary :data="lineStockInSummary" />
                    </div>
                    <div class="lg:w-80 xl:w-96 flex flex-col gap-2">
                        <EmployeeLeaderCard />
                        <EmployeeAttendanceCard />
                    </div>
                </div>

                <div class="bg-gray-50 rounded-lg p-5">
                    <AttendancesGroupLineTable :groupLine="groupLine" :isLoading="isLoading" />
                </div>
            </div>
        </n-card>

    </div>
</template>
<script lang="ts" setup>
import BaseButton from '@/components/BaseButton.vue';
import AttendancesGroupLineTable from '@/modules/attendances/components/AttendancesGroupLineTable.vue';
import { useAttendancePage } from '@/modules/attendances/composables/attendances.page';
import EmployeeAttendanceCard from '@/modules/employee/components/EmployeeAttendanceCard.vue';
import EmployeeLeaderCard from '@/modules/employee/components/EmployeeLeaderCard.vue';
import LineGlSummary from '@/modules/lines/components/LineGlSummary.vue';
import { useLinePage } from '@/modules/lines/composables/line.page';
import { Devices, LocationFilled } from '@vicons/carbon';
import { ChartPerson20Filled, ShiftsActivity20Filled } from '@vicons/fluent';
import { OnlinePredictionFilled } from '@vicons/material';
import { BrandAirtable, History, SmartHome } from '@vicons/tabler';
import dayjs from 'dayjs';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const lineId = route.params.id;

const { line, lineStockInSummary, handleFetchById } = useLinePage();
const { groupLine, isLoading, handleFetch: handleFetchAttendanceByLine } = useAttendancePage();

onMounted(() => {
    if (lineId) {
        const endDate = dayjs().format('YYYY-MM-DD')
        const startDate = dayjs().subtract(14, 'day').format('YYYY-MM-DD')
        handleFetchById(
            { notify: true },
            {
                id: lineId as string,
                startDate,
                endDate
            }
        );
        handleFetchAttendanceByLine({
            notify: false
        }, lineId as string);
    }
});

</script>