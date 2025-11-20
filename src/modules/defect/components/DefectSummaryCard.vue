<template>
    <div class="!w-[300px]">
        <n-card class="shadow-xs">
            <div class="flex flex-col gap-1">
                <p class="text-gray-400 text-xs">TOTAL DEFECT</p>
                <div class="flex gap-2 justify-start">
                    <p class="text-3xl font-bold text-red-600">{{ data.totalDefect }}</p>
                </div>
                <div class="text-sm">
                    <div class="flex justify-between">
                        <p class="text-gray-400">Total Lines</p>
                        <p class="font-semibold">{{ data.totalLines }}</p>
                    </div>
                </div>
                <div class="border-b-1 border-gray-200 my-2"></div>
                <div class="flex justify-between">
                    <p class="text-gray-400 text-xs">Last Updated</p>
                    <p class="text-gray-400 text-xs">November 20, 2025 12:10</p>
                </div>
            </div>
        </n-card>
    </div>
</template>

<script setup lang="ts">
import { useDefectPage } from '@/modules/defect/composables/defect.page';


const {
    summaryGroupLine: data
} = useDefectPage()

</script>