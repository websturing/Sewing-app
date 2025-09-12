<script setup lang="ts">
import type { SummaryByGl } from '@/modules/gls/schemas/gls.api.schema';
import { BorderLeft, ColorPalette, CutOut } from '@vicons/carbon';

interface Props {
    summary: SummaryByGl
    lastUpdated?: string
    rowIndex?: number
}
const { summary: gl, rowIndex } = defineProps<Props>()




</script>
<template>
    <n-card class="mb-4">
        <template #header>
            <div class="flex justify-between items-center border-b-1 border-gray-100 pb-5">
                <div class="font-bold text-lg flex items-center gap-3">
                    <n-avatar :size="52" color="#f0f6ff">
                        <p class="font-bold !text-blue-700">{{ rowIndex }}</p>
                    </n-avatar>
                    <div>
                        <p>GL-{{ gl.glNumber }}</p>
                        <div class="flex gap-4 mt-1">
                            <div class="flex items-center gap-2">
                                <n-icon>
                                    <ColorPalette />
                                </n-icon>
                                <p class="text-sm text-gray-400 font-normal">
                                    Color : {{ gl.layingPlannings.length }}
                                </p>
                            </div>
                            <div class="flex items-center gap-2">
                                <n-icon>
                                    <BorderLeft />
                                </n-icon>
                                <p class="text-sm text-gray-400 font-normal">
                                    Order Quantity :{{ gl.glSummary.orderQty }}
                                </p>
                            </div>
                            <div class="flex items-center gap-2">
                                <n-icon>
                                    <CutOut />
                                </n-icon>
                                <p class="text-sm text-gray-400 font-normal">
                                    Cut Quantity: {{ gl.glSummary.cutQty }}
                                </p>
                            </div>
                        </div>

                    </div>

                </div>
                <div>
                    <p class="text-sm text-gray-400 font-normal">Last Updated</p>
                    {{ lastUpdated }}
                </div>
            </div>
        </template>
        <slot />
    </n-card>
</template>