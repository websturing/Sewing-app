<template>
    <div class="flex flex-col gap-10">
        <div class="flex justify-between items-center gap-10">
            <div class="w-80 flex-auto">
                <h2 class="text-xl font-bold mb-1">{{ meta.title }}</h2>
                <p>{{ meta.description }}</p>
            </div>

            <div class="w-16 flex-auto text-right">
                <n-breadcrumb>
                    <n-breadcrumb-item><n-icon :component="SmartHome" /> Home</n-breadcrumb-item>
                    <n-breadcrumb-item>
                        <n-icon :component="ChartMultiple24Regular" />
                        Completion Report
                    </n-breadcrumb-item>
                </n-breadcrumb>
            </div>
        </div>

        <CompletionGenarateCard />
    </div>
</template>
<script setup lang="ts">
import CompletionGenarateCard from '@/modules/report-completion/components/CompletionGenarateCard.vue';
import type { MetaHead } from '@/types/metaHead';
import { useHead } from '@unhead/vue';
import { ChartMultiple24Regular } from '@vicons/fluent';
import { SmartHome } from '@vicons/tabler';
import { ref } from 'vue';

const meta = ref<MetaHead>({
    title: "Completion Report",
    description: "The Completion Report module provides a clear and structured overview of all production tasks that have been fully completed across the sewing line. It consolidates completion data from GL Numbers, colors, sizes, workstations, and lines, giving supervisors end-to-end visibility of finished output."
})

useHead({
    title: meta.value.title,
    meta: [
        { name: 'description', content: meta.value.description }
    ]
})

</script>