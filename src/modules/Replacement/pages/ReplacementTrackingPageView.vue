<template>
    <div class="flex flex-col gap-10">
        <div class="flex justify-between items-center">
            <div class="w-84 flex-auto">
                <h2 class="text-xl font-bold mb-1">{{ meta.title }}</h2>
                <p>{{ meta.description }}</p>
            </div>
            <div class="w-16 flex-auto text-right">
                <n-breadcrumb>
                    <n-breadcrumb-item><n-icon :component="SmartHome" /> Home</n-breadcrumb-item>
                    <n-breadcrumb-item>
                        <n-icon :component="InsightsRound" />
                        Track Replacement Request
                    </n-breadcrumb-item>
                </n-breadcrumb>
            </div>
        </div>

        <ReplacementTracking />
    </div>
</template>
<script setup lang="ts">
import ReplacementTracking from '@/modules/Replacement/components/ReplacementTracking.vue';
import type { MetaHead } from '@/types/metaHead';
import { useHead } from '@unhead/vue';
import { InsightsRound } from '@vicons/material';
import { SmartHome } from '@vicons/tabler';
import { ref } from "vue";


const meta = ref<MetaHead>({
    title: "Track Request Status & Progress",
    description: "Monitor the current stage, real-time status, and detailed progress history of your replacement requests."
})

useHead({
    title: meta.value.title,
    meta: [
        { name: 'description', content: meta.value.description }
    ]
})
</script>