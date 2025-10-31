<template>
    <div>
        <n-table :single-line="false">
            <thead>
                <tr class="text-center">
                    <th rowspan="2">Color</th>
                    <th rowspan="2">Type</th>
                    <th rowspan="2">Order</th>
                    <th colspan="4">Cut Pieces Flow</th>
                    <th colspan="2">Sewing Progress</th>
                </tr>
                <tr class="text-center">
                    <th width="40">Cut</th>
                    <th width="40">Cut -> Sew</th>
                    <th width="40">Sew In</th>
                    <th width="40">Sew Out</th>
                    <th width="40">Input</th>
                    <th width="40">Output</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="i in props.data" :key="i.id">
                    <td>{{ i.color }}</td>
                    <td width="30px">{{ i.type }}</td>
                    <td class="text-center">{{ i.orderQty }}</td>
                    <td class="text-center">{{ i.cutQty }}</td>
                    <td class="text-center">{{ i.stockOutQty }}</td>
                    <td class="text-center">{{ i.sewingTotalStockinQty }}</td>
                    <td class="text-center">{{ i.sewingTotalStockoutQty }}</td>
                    <td width="80px" :class="[
                        getPercentageColor(calculateSewingPercentage(i.cutQty, i.sewingTotalStockinQty)),
                        'text-center'
                    ]">
                        {{ calculateSewingPercentage(i.cutQty, i.sewingTotalStockinQty)
                        }} %</td>
                    <td width="80px" :class="[
                        getPercentageColor(calculateSewingPercentage(i.sewingTotalStockinQty, i.sewingTotalStockoutQty)),
                        'text-center'
                    ]">{{
                        calculateSewingPercentage(i.sewingTotalStockinQty, i.sewingTotalStockoutQty) }} %</td>
                </tr>
            </tbody>
        </n-table>
    </div>
</template>
<script setup lang="ts">
// 1️⃣ Imports
import { type GLCombineColor } from '@/modules/gls/schemas/glsCombine.api';

// 2️⃣ Props (kalau ada)
interface Props {
    data: GLCombineColor[],
}

const props = withDefaults(defineProps<Props>(), {
    data: () => [] as GLCombineColor[],
    isLoading: false,
})

function calculateSewingPercentage(toSew: any, sewingOut: any) {
    if (!toSew || toSew <= 0) return 0;
    const percentage = (sewingOut / toSew) * 100;
    return Number(percentage.toFixed(2));
}

function getPercentageColor(value: number) {
    if (value <= 0) return;

    const percentage = value;

    if (percentage < 50) return '!bg-red-200';
    if (percentage < 80) return '!bg-amber-200';
    return '!bg-green-200';
}


</script>