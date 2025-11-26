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
                        <n-icon :component="Forms" />
                        Replacement
                    </n-breadcrumb-item>
                </n-breadcrumb>
            </div>
        </div>

        Replacement
    </div>
</template>
<script setup lang="ts">
import type { MetaHead } from '@/types/metaHead';
import { useHead } from '@unhead/vue';
import { Forms, SmartHome } from '@vicons/tabler';
import { ref } from "vue";


const meta = ref<MetaHead>({
    title: "Defect Replacement Ticket",
    description: "Generates replacement tickets for defective GL numbers detected during stock-in or sewing operations, providing a streamlined and traceable defect-handling workflow."
})


useHead({
    title: meta.value.title,
    meta: [
        { name: 'description', content: meta.value.description }
    ]
})
</script>