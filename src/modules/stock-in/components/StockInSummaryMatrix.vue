<template>
    <div>
        <n-card class="shadow-xs">
            <div class="flex gap-3">

                <!-- total stock in all line  -->
                <n-progress type="dashboard" :percentage="100" :stroke-width="10" class="basis-54">
                    <div class="text-center">
                        <p class="text-xs text-gray-400">Cut Pieces</p>
                        <p class="text-2xl font-bold">{{ props.stockIn.pcs }}</p>
                    </div>
                </n-progress>
                <!-- Matrix & activities  -->

                <div class="flex flex-col gap-2 grow-1">
                    <div>
                        <n-card class="!bg-gray-50">
                            <div class="flex items-end">
                                <span class="text-3xl text-teal-400 font-bold">3</span>
                                <span class="text-gray-400 ml-2">Active Lines</span>
                            </div>
                            <div class="mt-2 flex gap-2">
                                <div class="flex gap-1 items-center">
                                    <n-icon :component="FolderOff" size="18" class="text-red-500" />
                                    <span class="text-sm">17 Inactive</span>
                                </div>
                                <div class="flex gap-1 items-center">
                                    <n-icon :component="Folder" size="18" />
                                    <span class="text-sm">20 Total Lines</span>
                                </div>
                            </div>
                        </n-card>

                    </div>
                    <div class="p-2">
                        <p class="text-gray-400 text-xs">Last Updated</p>
                        <p class="">{{ props.stockIn.lastUpdated }}</p>
                    </div>
                </div>


            </div>
        </n-card>
    </div>
</template>
<script setup lang="ts">
import { FolderOff } from '@vicons/carbon';
import { Folder } from '@vicons/tabler';

interface Props {
    stockIn: {
        pcs: number
        bundle: number
        lastUpdated: string | null
    }
}

const props = defineProps<Props>()

</script>