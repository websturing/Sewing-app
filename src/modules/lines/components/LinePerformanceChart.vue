<template>
    <div>
        <div class="flex justify-between">
            <p class="mb-2 text-gray-400">Top Line Performance</p>
            <BaseButton label="More" :icon="KeyboardArrowRightFilled" :quaternary="true" iconPlacement="right"
                @click="isModalOpen = !isModalOpen" />
        </div>
        <n-spin :show="isLoading">
            <div class="flex flex-col gap-2">
                <n-card class="shadow-xs cursor-pointer hover:!bg-gray-50"
                    v-for="(item) in props.line.slice(0, props.slice)" :key="item.id" :content-style="{ padding: 0 }">
                    <div class="flex justify-between px-4 py-2">
                        <div>
                            <p class="font-semibold">{{ item.name }}</p>
                            <span class="text-sm text-gray-400 flex items-center gap-1">
                                <n-icon :component="LocationCurrent" />
                                {{ item.location }}
                            </span>
                        </div>
                        <div>
                            <div class="text-right">
                                <p class="font-semibold">
                                    {{ item.pcs }}
                                    <span class="text-sm text-gray-400">pcs</span>
                                </p>
                                <span class="text-sm text-gray-400 ">{{ item.lastUpdated }}</span>
                            </div>
                        </div>
                    </div>
                </n-card>
            </div>
        </n-spin>


        <!-- modal for more details -->
        <n-modal v-model:show="isModalOpen" title="Line Performance" :mask-closable="true" preset="card"
            style="width: 1040px">
            <n-card :bordered="false" role="dialog" aria-modal="true">
                <div class="flex flex-wrap gap-2">
                    <div v-for="(item) in props.line" :key="item.id">
                        <n-card class="!w-[300px] shadow-xs cursor-pointer hover:!bg-gray-50"
                            :content-style="{ padding: 0 }">
                            <div class="flex justify-between px-4 py-2">
                                <div>
                                    <p class="font-semibold">{{ item.name }}</p>
                                    <span class="text-sm text-gray-400 flex items-center gap-1">
                                        <n-icon :component="LocationCurrent" />
                                        {{ item.location }}
                                    </span>
                                </div>
                                <div>
                                    <div class="text-right">
                                        <p class="font-semibold">
                                            {{ item.pcs }}
                                            <span class="text-sm text-gray-400">pcs</span>
                                        </p>
                                        <span class="text-sm text-gray-400 ">{{ item.lastUpdated }}</span>
                                    </div>
                                </div>
                            </div>
                        </n-card>
                    </div>
                </div>
            </n-card>
        </n-modal>
    </div>
</template>

<script setup lang="ts">
import { LocationCurrent } from '@vicons/carbon';
import { KeyboardArrowRightFilled } from '@vicons/material';
import { ref } from 'vue';

interface Props {
    line: {
        id: number
        name: string
        location: string | null
        pcs: number
        lastUpdated: string | null
    }[],
    slice?: number,
    isLoading?: boolean
}
const props = withDefaults(defineProps<Props>(), {
    line: () => [],
    slice: 3,
    isLoading: false
})

const isModalOpen = ref(false);

</script>