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

        <ReplacementForm />
    </div>
</template>
<script setup lang="ts">
import ReplacementForm from '@/modules/Replacement/components/ReplacementForm.vue';
import type { MetaHead } from '@/types/metaHead';
import { useHead } from '@unhead/vue';
import { Forms, SmartHome } from '@vicons/tabler';
import { ref } from "vue";


const meta = ref<MetaHead>({
    title: "Defect Replacement Ticket Form",
    description: "A streamlined form interface for issuing replacement tickets tied to defective GL numbers identified during stock-in or sewing operations."
})

useHead({
    title: meta.value.title,
    meta: [
        { name: 'description', content: meta.value.description }
    ]
})
</script>