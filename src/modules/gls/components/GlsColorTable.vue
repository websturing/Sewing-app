<template>
    <div class="flex flex-col gap-3">

        <n-timeline size="large" v-if="data.length > 0">
            <n-timeline-item v-for="(i, index) in props.data"
                :type="index != (props.data.length - 1) || props.data.length == 1 ? '' : ''">
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
                            <div class="text-gray-500 text-sm">
                                <p>Cut Pieces</p>
                                <p class="font-semibold">{{ i.totalPcs }}</p>
                            </div>
                            <div class="text-gray-500 text-sm">
                                <p>Bundles</p>
                                <p class="font-semibold">{{ i.totalBundle }}</p>
                            </div>
                            <div class="text-gray-500 text-sm">
                                <p>Sizes</p>
                                <p class="font-semibold">{{ i.totalSizes }}</p>
                            </div>
                            <div class="text-gray-500 text-sm">
                                <p>Defect</p>
                                <p class="font-semibold text-red-400">{{ i.totalDefect }}</p>
                            </div>
                        </div>
                    </div>
                </n-card>
            </n-timeline-item>
        </n-timeline>
        <p v-else>
            <n-empty description="You can't find anything">
            </n-empty>
        </p>
    </div>
</template>
<script setup lang="ts">
import type { matrixSummaryColor } from '@/modules/gls/schemas/gls.matrix.schema';
import { KeyboardArrowRightFilled } from "@vicons/material";

interface Props {
    data: matrixSummaryColor[]
}
const props = withDefaults(defineProps<Props>(), {
    data: () => []
})

</script>