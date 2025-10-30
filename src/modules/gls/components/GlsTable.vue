<template>
    <div class="flex flex-col gap-2">
        <BaseFilter :model-value="props.search" @update:model-value="(val) => emit('update:search', val)"
            @click:export="handleExportModal" @click:refresh="handleFetch" />
        <BaseDatable :columns="columns" :data="props.data" :loading="props.isLoading">
        </BaseDatable>
    </div>
</template>

<script setup lang="ts">
// 1️⃣ Imports
import BaseDatable from '@/components/BaseDatable.vue';
import BaseFilter from '@/components/BaseFilter.vue';
import { useGLTable } from '@/modules/gls/composables/gls.table';
import type { GLs } from '@/modules/gls/schemas/gls.api.schema';
import type { DataTableColumns } from 'naive-ui';


// 2️⃣ Props (kalau ada)
interface Props {
    data: GLs[],
    search: string,
    isLoading?: boolean
}
const props = withDefaults(defineProps<Props>(), {
    data: () => [] as GLs[],
    isLoading: false,
    search: ''
})
// 3️⃣ Emits (kalau ada)
const emit = defineEmits<{
    (e: 'update:search', value: string): void
}>()

// 4️⃣ Local state & composables
const {
    meta,
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
// 6️⃣ Computed / watchers (kalau ada)
// 7️⃣ Methods (local functions, event handlers, dsb.)
const handleFetch = () => { }
const handleExportModal = () => { }



</script>