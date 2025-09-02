<template>
    <n-space vertical :size="12">
        <n-data-table :bordered="true" :single-line="false" :columns="normalizedColumns" :data="props.data"
            :pagination="false" :loading="props.loading" />
    </n-space>
</template>

<script setup lang="ts">
import type { DataTableColumns } from "naive-ui";
import { computed, h, useSlots } from "vue";

interface Props<T = any> {
    columns: DataTableColumns<T>;
    data: T[];
    loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    loading: true,
});

const slots = useSlots();

/**
 * Normalized columns:
 * - Kalau ada slot dengan nama sama kayak `col.key`,
 *   maka col.render di-overwrite dengan slot tersebut.
 */
const normalizedColumns = computed(() => {
    return props.columns.map((col) => {
        if ("key" in col && col.key && slots[col.key]) {
            return {
                ...col,
                render: (row: any, index: number) =>
                    h("div", {}, slots[col.key]?.({ row, index })),
            };
        }
        return col;
    });
});
</script>
