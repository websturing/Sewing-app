<template>
    <div class="flex flex-col gap-2">
        <n-card :class="['shadow-xs cursor-pointer hover:!bg-gray-50']" :content-style="{ padding: 0 }"
            v-for="(item, index) in props.data" :key="index">
            <div class="flex justify-between px-4 py-2">
                <div>
                    <p class="font-semibold text-blue-500">{{ item.glNo }}</p>
                    <span class="text-xs text-gray-400">
                        {{ item.lineNames }}
                    </span>
                </div>
                <div>
                    <div class="text-right">
                        <p class="font-semibold">
                            {{ item.totalPcs }}
                            <span class="text-sm text-gray-400">pcs</span>
                        </p>
                        <span class="text-xs text-gray-400 ">
                            {{ item.lastUpdated }}
                        </span>
                    </div>
                </div>
            </div>
        </n-card>
    </div>
</template>
<script setup lang="ts">
import type { StockInSummaryGroupByGlNumber } from '@/modules/stock-in/schemas/stockInSummary.api.schema';


interface Props {
    data: StockInSummaryGroupByGlNumber[]
}
const props = withDefaults(defineProps<Props>(), {
    data: () => []
})

</script>