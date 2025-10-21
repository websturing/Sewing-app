<template>
    <div>
        <div class="flex justify-between">
            <div>
                <BaseInput v-model="search" :icon="SearchOutline" placeholder="Search Activity" />
            </div>
            <div class="flex gap-2">
                <n-date-picker v-model:value="dateRange" type="daterange" clearable />
                <n-select placeholder="Select Year" v-model:value="year" :options="yearList"
                    :style="{ width: '150px' }" />
                <BaseButton label="Refresh" :icon="RefreshOutline" type="primary" @click="emit('refresh')" />
                <BaseButton label="Export" :icon="DocumentExport" @click="emit('refresh')" />

                {{ dateRange }}
            </div>
        </div>
    </div>

</template>
<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";
import BaseInput from "@/components/BaseInput.vue";
import { DocumentExport } from "@vicons/carbon";
import { RefreshOutline, SearchOutline } from "@vicons/ionicons5";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useActivitiesSearch } from "../composables/activities.search";
import { useActivitiesStore } from "../stores/activities.store";

const emit = defineEmits<{
    (e: 'delete', id: number): void
    (e: 'refresh'): void
}>()


const dateRange = ref<[number, number] | null>(null);

// watch(dateRange, (val) => {
//     // const formatted = formatDateRangeYMD(val);
// });
const { search } = storeToRefs(useActivitiesStore())
const {
    year,
    yearList
} = useActivitiesSearch()


</script>