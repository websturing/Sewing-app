<template>
    <div>
        Summary Today

    </div>
</template>
<script setup lang="ts">
import { useStockInSummaryChart } from '@/modules/stock-in/composables/stockInSummary.chart';
import { onMounted } from 'vue';


const {
    handleFetchChartLines
} = useStockInSummaryChart()

onMounted(() => {
    handleFetchChartLines({
        filters: {
            startDate: '2025-09-13',
            endDate: '2025-10-13'
        }
    })
})
</script>