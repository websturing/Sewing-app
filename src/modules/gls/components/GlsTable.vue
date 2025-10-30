<template>
    <div class="flex flex-col gap-2">

        <BaseFilter :model-value="props.search" @update:model-value="(val) => emit('update:search', val)"
            @click:export="handleExportModal" @click:refresh="emit('click:refresh')" />
        <BaseDatable :columns="columns" :data="props.data" :loading="props.isLoading">
            <template #actions="{ row }">
                <BaseButton label="Detail" :icon="FolderDetails" :tertiary="true" type="primary"
                    @click="emit('click:detail', row.glNo)" />
            </template>
        </BaseDatable>

        <div class="flex justify-end mt-4">
            <n-pagination :page="props.meta.currentPage" :page-size="props.meta.perPage"
                :page-count="props.meta.lastPage" show-size-picker :page-sizes="[5, 10, 20, 50]"
                @update:page="(val: number) => emit('update:page', val)"
                @update:page-size="(val: number) => emit('update:pageSize', val)" />
        </div>
    </div>
</template>

<script setup lang="ts">
// 1️⃣ Imports
import BaseButton from "@/components/BaseButton.vue";
import BaseDatable from '@/components/BaseDatable.vue';
import BaseFilter from '@/components/BaseFilter.vue';
import { useGLTable } from '@/modules/gls/composables/gls.table';
import type { GLs } from '@/modules/gls/schemas/gls.api.schema';
import { FolderDetails } from "@vicons/carbon";
import type { DataTableColumns } from 'naive-ui';


// 2️⃣ Props (kalau ada)
interface Props {
    data: GLs[],
    search: string,
    isLoading?: boolean,
    meta: any
}
const props = withDefaults(defineProps<Props>(), {
    data: () => [] as GLs[],
    isLoading: false,
    search: ''
})
// 3️⃣ Emits (kalau ada)
const emit = defineEmits<{
    (e: 'update:search', value: string): void
    (e: 'click:refresh'): void
    (e: 'update:page', value: number): void
    (e: 'update:pageSize', value: number): void
    (e: 'click:detail', value: string): void
}>()

// 4️⃣ Local state & composables
const {
    meta,
} = useGLTable()


const columns: DataTableColumns<any> = [
    {
        title: 'No',
        key: 'index',
        align: 'center',
        width: 50,
        render: (_row: any, index: number) => {
            return (meta.value.currentPage - 1) * meta.value.perPage + index + 1
        }
    },
    {
        title: 'GL Number',
        key: 'glNo',
    },
    {
        title: 'Colors',
        key: 'totalColors',
        width: 100,
        align: 'center',
    },
    {
        title: 'sizes',
        key: 'totalSizes',
        width: 100,
        align: 'center',
    },
    {
        title: 'Last Updated',
        key: 'lastUpdated',
        width: 220,
    },
    {
        title: 'Actions',
        key: 'actions',
        width: 150,

    }
]


// 5️⃣ Lifecycle hooks
// 6️⃣ Computed / watchers (kalau ada)
// 7️⃣ Methods (local functions, event handlers, dsb.)
const handleExportModal = () => { }



</script>