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
                        <n-icon :component="BrandAirtable" />
                        Lines
                    </n-breadcrumb-item>
                </n-breadcrumb>
            </div>
        </div>

        <LinesTable />
    </div>
</template>

<script setup lang="ts">
// 1️⃣ Imports
import LinesTable from '@/modules/lines/components/LinesTable.vue';
import { useLinePage } from '@/modules/lines/composables/line.page';
import type { MetaHead } from '@/types/metaHead';
import { useHead } from '@unhead/vue';
import { BrandAirtable, SmartHome } from '@vicons/tabler';
import { onMounted, ref } from "vue";

// 2️⃣ Props (kalau ada)
// 3️⃣ Emits (kalau ada)

// 4️⃣ Local state & composables
const meta = ref<MetaHead>({
    title: "Sewing Line Management",
    description: "An intuitive dashboard to manage and monitor sewing lines. Each line displays active GL Numbers, colors, and size distributions — giving supervisors a clear picture of production flow and operator workload. The interface focuses on fast navigation, status clarity, and easy data access for daily line coordination."
})


useHead({
    title: meta.value.title,
    meta: [
        { name: 'description', content: meta.value.description }
    ]
})

const { handleFetch } = useLinePage()

onMounted(() => {
    handleFetch(
        { notify: true },
        { search: "" }
    )
})

</script>