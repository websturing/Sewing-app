<template>
    <div>
        <div>
            <div class="mb-4">
                <div class="flex justify-between items-center mb-2">
                    <div>
                        <BaseInput placeholder="Search GL Number" v-model="search" />
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="flex flex-col gap-2" v-if="glData.length > 0">
                <StockInCard v-for="(item, index) in glData" :key="index" :item="item" />
            </div>
            <div v-else>
                <n-empty description="GL Number data not found.">

                </n-empty>
            </div>
        </div>


    </div>
</template>

<script setup lang="ts">
import BaseInput from '@/components/BaseInput.vue';
import StockInCard from '@/modules/stock-in/components/StockInCard.vue';
import { useStockInSummary } from '@/modules/stock-in/composables/useStockInSummary';
import { onMounted } from 'vue';

const { glData, search, handleFetchGroupGL } = useStockInSummary();



onMounted(() => {
    handleFetchGroupGL({}, { notify: true });
});

</script>