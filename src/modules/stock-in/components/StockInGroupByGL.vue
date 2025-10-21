<template>
    <div>
        <StockInCard :data="glData.data" />
    </div>
</template>

<script setup lang="ts">
import StockInCard from '@/modules/stock-in/components/StockInCard.vue';
import { useStockInSummary } from '@/modules/stock-in/composables/useStockInSummary';
import { onMounted } from 'vue';

const { loading, glData, handleFetchGroupGL } = useStockInSummary();

onMounted(() => {
    handleFetchGroupGL({}, { notify: true });
});

</script>