<template>
    <div class="flex flex-col gap-3">
        <div>
            <p class="font-bold">GL Production Summary Oct 20 - Nov 03, 2025</p>
        </div>

        <n-timeline size="large">
            <n-timeline-item v-for="(i, index) in props.data"
                :type="index != (props.data.length - 1) || props.data.length == 1 ? 'success' : ''">
                <n-card>
                    <template #header>
                        <p class="text-blue-700 text-sm">{{ i.color }}</p>
                    </template>
                    <template #header-extra>
                        <n-icon :component="KeyboardArrowRightFilled" :size="24"
                            class="cursor-pointer hover:bg-gray-200" />
                    </template>
                    <div class="flex flex-col gap-2">

                        <div class="flex gap-5 gap-y-1 items-center flex-wrap">
                            <p class="text-gray-500 text-sm">
                                Total Cut Pieces : <span class="font-semibold">{{ i.totalPcs }}</span>
                            </p>
                            <p class="text-gray-500 text-sm">
                                Total Bundles : <span class="font-semibold">{{ i.totalBundle }}</span>
                            </p>

                            <p class="text-gray-500 text-sm">
                                Total Sizes : <span class="font-semibold">{{ i.totalSizes }}</span>
                            </p>
                        </div>
                    </div>
                </n-card>
            </n-timeline-item>
        </n-timeline>
    </div>
</template>
<script setup lang="ts">
import type { matrixSummaryColor } from '@/modules/gls/schemas/gls.matrix.schema';
import { KeyboardArrowRightFilled } from "@vicons/material";

interface Props {
    data: matrixSummaryColor[]
}
const props = withDefaults(defineProps<Props>(), {})

</script>