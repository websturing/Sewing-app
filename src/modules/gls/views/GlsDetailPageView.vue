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


        <div class="flex justify-between">
            <div class="flex flex-inline gap-2">
                <GlsCard title="GL Number" :value="glNumber" variant="text-black" />

                <GlsCard title="Current Stock Cut Pieces" :value="glNumber" />
                <GlsCard title="Total Production Output" :value="glNumber" variant="text-teal-500" />
                <GlsCard title="Order Cut Pieces" :value="glNumber" variant="text-gray-500" />
            </div>
            <div>
                <p>Last Updated</p>
                <p class="text-2xl text-gray-400">28/07/2025 14:40:15</p>
            </div>
        </div>


    </div>
</template>

<script setup lang="ts">
// 1️⃣ Imports
import GlsCard from '@/modules/gls/components/GlsCard.vue';
import { useGLPage } from '@/modules/gls/composables/gls.page';
import type { MetaHead } from '@/types/metaHead';
import { useHead } from '@unhead/vue';
import { BorderLeft20Filled } from '@vicons/fluent';
import { SmartHome } from '@vicons/tabler';
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

// 4️⃣ Local state & composables
const glNumber = ref<string>("");
const meta = ref<MetaHead>({
    title: "GL Number Transfer & History Overview",
    description: "View detailed transfer history and current status of GL Number bundles through stock and line workflows."
})

const {
    handleCuttingIntegrationGl
} = useGLPage()



// 6️⃣ Computed / watchers (kalau ada)
useHead({
    title: meta.value.title,
    meta: [
        { name: 'description', content: meta.value.description }
    ]
})

watch(
    () => route.params.id as string,
    (newId: string) => {
        if (newId) {
            glNumber.value = newId
            handleCuttingIntegrationGl(newId)
        }
    },
    { immediate: true }
)
</script>