<template>
    <div class="flex flex-col gap-5">
        <n-card class="!bg-gray-50 !border !border-gray-200">
            <div>
                <BaseInput v-model="serialNumber" :icon="Search" placeholder="Search Replacement Request" />
            </div>
        </n-card>

        <div>
            <p class="font-semibold text-lg">Replacement Request Workflow</p>
            <p>Track the steps and status for Ticket : {{ serialNumber }}</p>
        </div>
        <div class="flex gap-2 flex-wrap">
            <n-card v-for="i in 10" :key="i" class="!w-[263px] !lg:w-[20%] !md:w-[30%] !sm:w-[55%] !max-w-[350px]">
                <div class="flex flex-col gap-2">
                    <p>Replacement Request Created</p>

                    <div class="flex">
                        <div class="text-xs px-2 py-0.5 bg-red-100 inline-flex">Progress</div>
                    </div>

                    <div class="flex flex-col gap-1">
                        <BaseIconWithLabel :icon="CalendarRtl12Regular" label="December 08, 2025 14:17" :size="14" />
                        <BaseIconWithLabel :icon="FolderPerson16Regular" label="gita(gita@ghimli.com)" :size="16" />
                    </div>
                </div>
            </n-card>
        </div>

    </div>
</template>
<script setup lang="ts">
import BaseIconWithLabel from '@/components/BaseIconWithLabel.vue';
import BaseInput from '@/components/BaseInput.vue';
import { CalendarRtl12Regular, FolderPerson16Regular } from '@vicons/fluent';
import { Search } from '@vicons/ionicons5';
import { ref } from 'vue';
const serialNumber = ref<string | null>(null)



</script>