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
                        <n-icon :component="BorderLeft20Filled" />
                        GL Number
                    </n-breadcrumb-item>
                </n-breadcrumb>
            </div>
        </div>

        <Table />
    </div>
</template>

<script setup lang="ts">
import Table from "@/modules/gls/components/GlsTable.vue";
import type { MetaHead } from '@/types/metaHead';
import { useHead } from '@unhead/vue';
import { BorderLeft20Filled } from '@vicons/fluent';
import { SmartHome } from '@vicons/tabler';
import { ref } from "vue";



const meta = ref<MetaHead>({
    title: "GL Number",
    description: "The GL Number module provides an overview of all production lots currently being processed or already completed within the sewing line."
})

useHead({
    title: meta.value.title,
    meta: [
        { name: 'description', content: meta.value.description }
    ]
})
</script>