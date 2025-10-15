<template>
    <div class="flex flex-col gap-10">
        <BasePageHeader :title="meta.title" :description="meta.description" :breadcrumbs="[
            { label: 'Home', icon: SmartHome, to: '/' },
            { label: meta.title, icon: QrCodeScannerSharp }
        ]" />


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
import BasePageHeader from '@/components/BasePageHeader.vue';
import LinePerformanceChart from '@/modules/lines/components/LinePerformanceChart.vue';
import SummaryChart from "@/modules/stock-in/components/StockInSummaryChart.vue";
import SummaryMatrix from "@/modules/stock-in/components/StockInSummaryMatrix.vue";
import StockInTable from '@/modules/stock-in/components/StockInTable.vue';
import { useStockInSummaryChart } from '@/modules/stock-in/composables/stockInSummary.chart';
import type { MetaHead } from '@/types/metaHead';
import { useHead } from '@unhead/vue';
import { QrCodeScannerSharp } from '@vicons/material';
import { SmartHome } from '@vicons/tabler';
import { ref } from 'vue';


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

const { totalStockInPcs, stockInTotal, linePerformance } = useStockInSummaryChart()



</script>