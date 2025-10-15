<template>
    <div>
        <VChart :option="optionsEchart" autoresize style="height: 400px;" />
    </div>
</template>
<script setup lang="ts">
import { useStockInSummaryChart } from '@/modules/stock-in/composables/stockInSummary.chart';
import { onMounted } from 'vue';
const {
    optionsEchart,
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