<template>
    <div>
        <BaseDatable :columns="columns" :data="data" :loading="loading">
        </BaseDatable>
    </div>
</template>

<script setup lang="ts">
// 1️⃣ Imports
import BaseDatable from '@/components/BaseDatable.vue';
import { useGLTable } from '@/modules/gls/composables/gls.table';
import type { DataTableColumns } from 'naive-ui';
import { onMounted } from 'vue';


// 2️⃣ Props (kalau ada)
// 3️⃣ Emits (kalau ada)

// 4️⃣ Local state & composables
const {
    meta,
    loading,
    data,
    handleFetch
} = useGLTable()


const columns: DataTableColumns<any> = [
    {
        title: 'No',
        key: 'index',
        width: 60,
        render: (_row: any, index: number) => {
            return (meta.value.currentPage - 1) * meta.value.perPage + index + 1
        }
    },
    {
        title: 'GL Number',
        key: 'glNo',
    },
    {
        title: 'Last Updated',
        key: 'lastUpdated',
    },
]



// 5️⃣ Lifecycle hooks
onMounted(async () => {
    await handleFetch()
})

// 6️⃣ Computed / watchers (kalau ada)
// 7️⃣ Methods (local functions, event handlers, dsb.)


</script>