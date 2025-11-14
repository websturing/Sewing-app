<template>
    <div class="bg-gray-50 rounded-lg p-5">
        <div class="flex flex-col gap-3">
            <div class="flex">
                <p class="w-[120px] font-semibold">GL Number</p>
                <n-select v-model:value="glNumber" :options="glNumberList" class="!w-[220px]" />
            </div>
            <div class="flex">
                <p class="w-[120px] font-semibold">Color</p>
                <n-select v-model:value="glNumber" :options="glNumberList" class="!w-[420px]" />
            </div>
            <div class="flex">
                <p class="w-[120px] font-semibold">Range Date</p>
                <div class="flex gap-2 items-center h-[30px]">
                    <n-switch v-model:value="isDateRange">
                        <template #checked>
                            All Dates
                        </template>
                        <template #unchecked>
                            Custom Dates
                        </template>
                    </n-switch>
                    <n-select v-if="!isDateRange" v-model:value="glNumber" :options="glNumberList" class="!w-[420px]" />
                </div>

            </div>
            <BaseButton label="Generate Completion Report" :icon="BorderLeft24Filled" type="primary" />
        </div>
    </div>
</template>
<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import { BorderLeft24Filled } from '@vicons/fluent';
import { ref } from "vue";

const glNumber = ref(null)
const isDateRange = ref<boolean>(true)
const glNumberList = [
    { label: "1", value: "1" },
    { label: "2", value: "2" }
]


</script>