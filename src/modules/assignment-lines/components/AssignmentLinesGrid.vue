<template>
    <div class="flex flex-col gap-5">
        <div class="flex gap-10">
            <div class="flex-1">
                <BaseAdvanceFilter v-model="search" v-model:dateRange="dateRange" @click:export="handleExportModal"
                    @click:refresh="handleFetch" />
            </div>
            <div class="">
                <BaseButton label="Create Assignment" :icon="CreateFilled" type="primary" @click="handleCreate" />
            </div>
        </div>
        <div class="grid grid-cols-3 gap-4">
            <n-card v-for="item in searchedItems" :key="item.id" hoverable>
                <template #header>
                    <div class="flex justify-between items-start border-b border-gray-200 pb-3">
                        <!-- Kiri: Avatar + Line Info -->
                        <div class="flex gap-2 items-center">
                            <n-avatar :size="28" :color="item.glNumber.length === 0 ? '' : '#40916c'">
                                <n-icon>
                                    <CloudOff16Filled v-if="item.glNumber.length === 0" />
                                    <OnlinePredictionFilled v-else />
                                </n-icon>
                            </n-avatar>
                            <div class="text-sm font-semibold">
                                Line {{ item.name }}
                            </div>
                        </div>

                        <!-- Kanan: Placeholder untuk action -->
                        <div>
                            <n-button quaternary circle>
                                <template #icon>
                                    <n-icon>
                                        <MoreVertical16Filled />
                                    </n-icon>
                                </template>
                            </n-button>
                        </div>
                    </div>
                </template>

                <div class="flex flex-col gap-3">
                    <!-- GL Numbers -->
                    <div class="flex justify-between">
                        <p class="text-gray-400 text-xs">GL Numbers</p>
                        <div class="flex gap-2">
                            <p v-for="(gl, index) in item.glNumber" :key="index" class="text-xs font-medium">
                                {{ gl }}
                            </p>
                        </div>
                    </div>

                    <!-- Colors -->
                    <div>
                        <p class="text-gray-400 text-xs">Colors</p>
                        <div class="flex flex-wrap gap-2 mt-1">
                            <n-tag size="small" type="info" v-for="(color, index) in item.colors" :key="index">
                                {{ color }}
                            </n-tag>
                        </div>
                    </div>
                </div>
            </n-card>

        </div>
    </div>
</template>
<script setup lang="ts">
import BaseAdvanceFilter from '@/components/BaseAdvanceFilter.vue';
import BaseButton from '@/components/BaseButton.vue';
import { useAssignmentLinesGrid } from '@/modules/assignment-lines/composables/assignmentLine.grid';
import { CloudOff16Filled, MoreVertical16Filled } from '@vicons/fluent';
import { CreateFilled, OnlinePredictionFilled } from '@vicons/material';
import { onMounted, ref } from "vue";
import { useRouter } from 'vue-router';



const router = useRouter();
const dateRange = ref<[number, number] | null>(null);


const {
    search,
    searchedItems,
    handleFetchStore
} = useAssignmentLinesGrid()



onMounted(() => {
    handleFetchStore()
})

const handleFetch = () => {
    console.log('fetching data with search:', search.value, 'and dateRange:', dateRange.value);
}
const handleExportModal = () => {
    console.log('exporting data with search:', search.value, 'and dateRange:', dateRange.value);
}

const handleCreate = () => {
    router.push({ name: 'assignment-lines-form' });
}

</script>