<template>
    <div class="flex flex-col gap-10">
        <div class="bg-gray-50 p-5 rounded-md">
            <BasePageHeader :title="meta.title" :description="meta.description" :breadcrumbs="[
                { label: 'Home', icon: SmartHome, to: '/' },
                { label: meta.title, icon: BrandAirtable, to: { name: 'assignment-lines' } },
                { label: 'Form', icon: FormNew28Regular }
            ]" />
        </div>

        <AssignmentLinesForm />
    </div>
</template>
<script setup lang="ts">
import BasePageHeader from '@/components/BasePageHeader.vue';
import AssignmentLinesForm from '@/modules/assignment-lines/components/AssignmentLinesForm.vue';
import type { MetaHead } from '@/types/metaHead';
import { useHead } from '@unhead/vue';
import { FormNew28Regular } from '@vicons/fluent';
import { BrandAirtable, SmartHome } from '@vicons/tabler';
import { ref } from 'vue';


const meta = ref<MetaHead>({
    title: "Assignment Lines Form",
    description: "Create a new assignment between a line and GL."
})

useHead({
    title: meta.value.title,
    meta: [
        { name: 'description', content: meta.value.description }
    ]
})
</script>