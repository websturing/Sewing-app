<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import type { LayingPlanning } from '@/modules/gls/schemas/gls.api.schema';

interface Props {
    layingPlanning: LayingPlanning
    bgColor?: string | string[]
    rowIndex?: number
}
const { layingPlanning: item, bgColor } = defineProps<Props>()
const handleCard = (value: any) => {
    emit('click', value)
}

const emit = defineEmits<{
    (e: "click", value: LayingPlanning): void
}>()


</script>
<template>
    <div>
        <div role="button" tabindex="0" @click="handleCard(item)" @keydown.enter.space.prevent="handleCard"
            class="cursor-pointer">

            <n-card hoverable style="width: 330px" :content-class="bgColor" :header-class="bgColor">
                <template #header>
                    <div class="flex justify-between items-start mb-2">
                        <!-- Left side -->
                        <div class="font-bold text-lg flex gap-3">
                            <div class="text-[14px]">
                                <n-ellipsis style="max-width: 240px">
                                    {{ item.color }}
                                    <template #tooltip>
                                        <div class="text-center">
                                            {{ item.color }}
                                        </div>
                                    </template>
                                </n-ellipsis>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col gap-1  text-sm">
                        <div class="flex justify-between">
                            <p class="font-normal text-xs">Type:</p>
                            <p class="text-xs text-teal-700">{{ item.type }}</p>
                        </div>
                        <div class="flex justify-between">
                            <p class="text-gray-400 font-normal">
                                Order Quantity:
                            </p>
                            {{ item.summary.orderQty }}
                        </div>
                        <div class="flex justify-between">
                            <p class="text-gray-400 font-normal">
                                Cut Quantity:
                            </p>
                            {{ item.summary.cutQty }}
                        </div>



                    </div>
                </template>

                <div class="flex flex-col justify-between">
                    <p class="text-xs text-gray-400 mb-2">Sizes</p>
                    <div class="flex flex-wrap">
                        <BaseButton type="info" size="small" :tertiary="true"
                            v-for="(size, index) in item.sizeBreakdown" :key="index"
                            :class-content="[index != (item.sizeBreakdown.length - 1) ? '!mr-2 !mb-2' : '!mb-2']">
                            {{ size.size }}
                        </BaseButton>
                    </div>
                </div>
            </n-card>
        </div>
    </div>
</template>