<template>
    <div class="flex flex-col gap-10">
        <BasePageHeader :title="meta.title" :description="meta.description" :breadcrumbs="[
            { label: 'Home', icon: SmartHome, to: '/' },
            { label: meta.title, icon: BrandAirtable }
        ]" />

        <AssignmentLinesGrid />
    </div>
</template>
<script setup lang="ts">
import BasePageHeader from '@/components/BasePageHeader.vue';
import AssignmentLinesGrid from '@/modules/assignment-lines/components/AssignmentLinesGrid.vue';
import type { MetaHead } from '@/types/metaHead';
import { useHead } from '@unhead/vue';
import { BrandAirtable, SmartHome } from '@vicons/tabler';
import { ref } from 'vue';


const meta = ref<MetaHead>({
    title: "Assignment Lines",
    description: "The Assignment Lines module manages the mapping between production lines and GLs. It allows administrators to assign one or more GLs to a specific line, ensuring clarity of responsibility and streamlined production tracking."
})

useHead({
    title: meta.value.title,
    meta: [
        { name: 'description', content: meta.value.description }
    ]
})
</script>