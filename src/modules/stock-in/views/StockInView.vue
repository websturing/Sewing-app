<template>
    <div class="flex flex-col gap-10">
        <BasePageHeader :title="meta.title" :description="meta.description" :breadcrumbs="[
            { label: 'Home', icon: SmartHome, to: '/' },
            { label: meta.title, icon: QrCodeScannerSharp }
        ]" />

        <StockInTable />
    </div>
</template>
<script setup lang="ts">
import BasePageHeader from '@/components/BasePageHeader.vue';
import StockInTable from '@/modules/stock-in/components/StockInTable.vue';
import type { MetaHead } from '@/types/metaHead';
import { useHead } from '@unhead/vue';
import { QrCodeScannerSharp } from '@vicons/material';
import { SmartHome } from '@vicons/tabler';
import { ref } from 'vue';


const meta = ref<MetaHead>({
    title: "Stock In",
    description: "The Stock In module records and manages all incoming bundles into the sewing line. It provides a clear overview of materials received, including bundle details, quantities, and timestamps."
})

useHead({
    title: meta.value.title,
    meta: [
        { name: 'description', content: meta.value.description }
    ]
})
</script>