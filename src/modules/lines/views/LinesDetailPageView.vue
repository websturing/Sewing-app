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
            <p>Current GL Number</p>
            <LineGlSummary :data="lineStockInSummary" />
        </n-card>

    </div>
</template>
<script lang="ts" setup>
import BaseButton from '@/components/BaseButton.vue';
import LineGlSummary from '@/modules/lines/components/LineGlSummary.vue';
import { useLinePage } from '@/modules/lines/composables/line.page';
import { Devices, LocationFilled } from '@vicons/carbon';
import { ChartPerson20Filled, ShiftsActivity20Filled } from '@vicons/fluent';
import { OnlinePredictionFilled } from '@vicons/material';
import { BrandAirtable, History, SmartHome } from '@vicons/tabler';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const lineId = route.params.id;

const { line, lineStockInSummary, handleFetchById } = useLinePage();

onMounted(() => {
    if (lineId) {
        handleFetchById(
            { notify: true },
            {
                id: lineId as string,
                startDate: "2025-11-01",
                endDate: "2025-11-07"
            }
        );
    }
});

</script>