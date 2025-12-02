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
                        <n-icon :component="DesignIdeas16Filled" />
                        Replacement Approval
                    </n-breadcrumb-item>
                </n-breadcrumb>
            </div>
        </div>

    </div>
</template>
<script setup lang="ts">
import type { MetaHead } from '@/types/metaHead';
import { useHead } from '@unhead/vue';
import { DesignIdeas16Filled } from '@vicons/fluent';
import { SmartHome } from '@vicons/tabler';
import { ref } from "vue";


const meta = ref<MetaHead>({
    title: "Replacement Request Approval",
    description: "A dedicated approval interface for validating and authorizing defect-related replacement requests. This module enforces workflow compliance, ensures data integrity, and provides controlled decision-making for all submitted replacement tickets."
})

useHead({
    title: meta.value.title,
    meta: [
        { name: 'description', content: meta.value.description }
    ]
})
</script>