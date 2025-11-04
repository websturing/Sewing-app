<template>
    <div class="flex flex-col gap-1">
        <div class="flex justify-between">
            <div>
                <p class="font-bold ">Daily Production Movement</p>
                <p class="font-semibold ">Oct 20 - Nov 03, 2025</p>
            </div>
            <div class="flex gap-2">

                <BaseButton label="Reset" :icon="ArrowReset20Filled" quaternary type="error" />
                <BaseButton label="Refresh" :icon="RefreshRound" />
                <n-date-picker v-model:value="range" type="datetimerange" clearable />
            </div>
        </div>


        <VChart :option="props.chart" autoresize style="height: 380px; width: 100%;" />
    </div>
</template>
<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";
import { ArrowReset20Filled } from "@vicons/fluent";
import { RefreshRound } from '@vicons/material';
import { ref } from 'vue';

interface Props {
    chart: any
}
const props = withDefaults(defineProps<Props>(), {})

const range = ref<[number, number]>([1183135260000, Date.now()])

</script>