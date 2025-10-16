<template>
    <div>
        <VChart :option="optionsEchart" autoresize style="height: 400px;" />
    </div>
</template>
<script setup lang="ts">
import { useStockInSummaryChart } from '@/modules/stock-in/composables/stockInSummary.chart';
const {
    optionsEchart,
} = useStockInSummaryChart()

</script>