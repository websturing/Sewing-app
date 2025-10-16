<template>
    <div class="flex flex-col gap-10">
        <div class="flex justify-between items-end gap-10">
            <div class="w-80 flex-auto">
                <h2 class="text-xl font-bold mb-1">{{ meta.title }}</h2>
                <p>{{ meta.description }}</p>
            </div>
            <div class="w-10 flex-auto text-right">
                <div class="flex justify-end items-center gap-2">
                    <n-date-picker :value="dateRange" type="daterange" clearable class="w-80 inline-block"
                        @update:value="(val: any) => handleDateRange(val)" />

                    <BaseButton label="Refresh" :icon="RefreshRound" type="primary" tertiary @click="handlDateRange" />
                </div>
            </div>
        </div>


        <div class="flex gap-2">
            <div class="w-full">
                <div class="flex gap-2">
                    <div class="w-full md:w-3/5">
                        <SummaryMatrix :stock-in="stockInTotal" />
                    </div>
                    <div class="w-full md:w-2/5">
                        <LinePerformanceChart :line="linePerformance" :slice="3" />
                    </div>
                </div>

                <SummaryChart />
            </div>


        </div>
        <StockInTable />
    </div>
</template>
<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import { formatDateRangeYMD } from '@/lib/dateRangeFormaterNaive';
import LinePerformanceChart from '@/modules/lines/components/LinePerformanceChart.vue';
import SummaryChart from "@/modules/stock-in/components/StockInSummaryChart.vue";
import SummaryMatrix from "@/modules/stock-in/components/StockInSummaryMatrix.vue";
import StockInTable from '@/modules/stock-in/components/StockInTable.vue';
import { useStockInSummaryChart } from '@/modules/stock-in/composables/stockInSummary.chart';
import type { MetaHead } from '@/types/metaHead';
import { useHead } from '@unhead/vue';
import { RefreshRound } from '@vicons/material';
import { onMounted, ref } from 'vue';


const meta = ref<MetaHead>({
    title: "Stock In",
    description: "The Stock In module records and manages all incoming bundles into the sewing line. It provides a clear overview of materials received, including bundle details, quantities, and timestamps."
})

useHead({
    title: meta.value.title,
    meta: [
        { name: 'description', content: meta.value.description }
    ]
})

const { stockInTotal, linePerformance, handleFetchChartLines } = useStockInSummaryChart()

const handlDateRange = () => {
    const today = new Date()
    const lastMonth = new Date()
    lastMonth.setMonth(today.getMonth() - 1)
    dateRange.value = [lastMonth.getTime(), today.getTime()]
    const formatted = formatDateRangeYMD(dateRange.value);

    if (formatted && formatted.length === 2) {
        handleFetchChartLines({
            filters: {
                startDate: formatted[0],
                endDate: formatted[1]
            }
        })

    }
}


const dateRange = ref<[number, number] | null>(null)
const handleDateRange = (val: [number, number] | null) => {
    const formatted = formatDateRangeYMD(val);
    if (formatted && formatted.length === 2) {
        handleFetchChartLines({
            filters: {
                startDate: formatted[0],
                endDate: formatted[1]
            }
        }, { notify: false })

    }
    dateRange.value = val
}

onMounted(() => {
    handlDateRange()
})

</script>