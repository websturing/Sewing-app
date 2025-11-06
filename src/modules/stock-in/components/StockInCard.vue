<template>
    <div class="flex flex-col gap-2">
        <n-card :class="['shadow-xs cursor-pointer hover:!bg-gray-50']" :content-style="{ padding: 0 }">
            <div class="flex justify-between px-4 py-2">
                <div>
                    <p class="font-semibold text-blue-500" @click="navigateToGLDetail(props.item.glNo)">{{
                        props.item.glNo }}</p>
                    <span class="text-xs text-gray-400">
                        {{ props.item.lineNames }}
                    </span>
                </div>
                <div>
                    <div class="text-right">
                        <p class="font-semibold">
                            {{ props.item.totalPcs }}
                            <span class="text-sm text-gray-400">pcs</span>
                        </p>
                        <span class="text-xs text-gray-400 ">
                            {{ props.item.lastUpdated }}
                        </span>
                    </div>
                </div>
            </div>
        </n-card>
    </div>
</template>
<script setup lang="ts">
import { useGLPage } from '@/modules/gls/composables/gls.page';
import type { StockInSummaryGroupByGlNumber } from '@/modules/stock-in/schemas/stockInSummary.api.schema';

interface Props {
    item: StockInSummaryGroupByGlNumber
}
const props = withDefaults(defineProps<Props>(), {})

const { navigateToGLDetail } = useGLPage()
</script>