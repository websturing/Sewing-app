<template>
    <div class="flex flex-col gap-10">
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
                    <th width="100px">Cut</th>
                    <th width="100px">Cut -> Sew</th>
                    <th width="100px">Sew In</th>
                    <th width="100px">Sew Out</th>
                    <th width="100px">Input</th>
                    <th width="100px">Output</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="i in props.data" :key="i.id">
                    <td>
                        <BaseButton :label="i.color" :icon="Color20Filled" :quaternary="true" type="primary"
                            @click="handleColorDetail(i)" />
                    </td>
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




        <n-modal v-model:show="showModal" preset="card" :style="'width: 1200px'">
            <template #header>
                <div class="flex justify-between items-end">
                    <div class="flex gap-6 items-end">
                        <div>
                            <p class="text-gray-400 text-sm font-normal">GL Number</p>
                            <p class="font-bold">{{ glNumber }}</p>
                        </div>
                        <div>
                            <p class="text-gray-400 text-sm font-normal">Color</p>
                            <p class="font-bold">{{ colorDetail?.color }}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <div class="flex items-center gap-1 text-sm text-gray-600">
                            <n-icon :component="FolderSync16Regular" :size="24" />
                            <span>{{ colorDetail?.lastSyncAt }}</span>
                        </div>
                        <BaseButton label="Export" :tertinary="true" :icon="DocumentPdf" />
                    </div>
                </div>
            </template>
            <div>
                <n-table :single-line="false">
                    <thead>
                        <tr class="text-center">
                            <th rowspan="2">Size</th>
                            <th rowspan="2">Order</th>
                            <th colspan="4">Cut Pieces Flow</th>
                            <th colspan="2">Sewing Progress</th>
                        </tr>
                        <tr class="text-center">
                            <th width="100px">Cut</th>
                            <th width="100px">Cut -> Sew</th>
                            <th width="100px">Sew In</th>
                            <th width="100px">Sew Out</th>
                            <th width="100px">Input</th>
                            <th width="100px">Output</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="i in colorDetail?.sizes" :key="i.id">
                            <td class="text-center">{{ i.size }}</td>
                            <td class="text-center">{{ i.orderQty }}</td>
                            <td class="text-center">{{ i.cutQty }}</td>
                            <td class="text-center">{{ i.stockOutQty }}</td>
                            <td class="text-center">{{ i.sewingStockinQty }}</td>
                            <td class="text-center">{{ i.sewingStockoutQty }}</td>
                            <td width="80px" :class="[
                                getPercentageColor(calculateSewingPercentage(i.cutQty, i.sewingStockinQty)),
                                'text-center'
                            ]">
                                {{ calculateSewingPercentage(i.cutQty, i.sewingStockinQty)
                                }} %</td>
                            <td width="80px" :class="[
                                getPercentageColor(calculateSewingPercentage(i.sewingStockinQty, i.sewingStockoutQty)),
                                'text-center'
                            ]">{{
                                calculateSewingPercentage(i.sewingStockinQty, i.sewingStockoutQty) }} %</td>
                        </tr>
                    </tbody>
                </n-table>
            </div>
        </n-modal>


    </div>
</template>
<script setup lang="ts">
// 1️⃣ Imports
import BaseButton from "@/components/BaseButton.vue";
import { type GLCombineColor } from '@/modules/gls/schemas/glsCombine.api';
import { DocumentPdf } from "@vicons/carbon";
import { Color20Filled, FolderSync16Regular } from "@vicons/fluent";
import { ref } from "vue";

// 2️⃣ Props (kalau ada)
interface Props {
    data: GLCombineColor[],
    glNumber: string
}

const props = withDefaults(defineProps<Props>(), {
    data: () => [] as GLCombineColor[],
    isLoading: false,
})


const colorDetail = ref<GLCombineColor>()
const showModal = ref<boolean>(false)


// 5️⃣ Lifecycle hooks
// 6️⃣ Computed / watchers (kalau ada)
// 7️⃣ Methods (local functions, event handlers, dsb.)
const calculateSewingPercentage = (toSew: any, sewingOut: any) => {
    if (!toSew || toSew <= 0) return 0;
    const percentage = (sewingOut / toSew) * 100;
    return Number(percentage.toFixed(2));
}

const getPercentageColor = (value: number) => {
    if (value <= 0) return;

    const percentage = value;

    if (percentage < 50) return '!bg-red-200';
    if (percentage < 80) return '!bg-amber-200';
    return '!bg-green-200';
}

const handleColorDetail = (item: GLCombineColor) => {
    showModal.value = true
    colorDetail.value = item
}
</script>