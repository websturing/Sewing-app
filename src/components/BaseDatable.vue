<template>
    <n-space vertical :size="12">
        <n-data-table :bordered="true" :single-line="false" :columns="normalizedColumns" :data="props.data"
            :pagination="false" />
    </n-space>
</template>

<script setup lang="ts">
import type { DataTableColumns } from "naive-ui";
import { NSkeleton } from "naive-ui";
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
    return props.columns.map((col: any) => {
        const originalRender = col.render;

        return {
            ...col,
            ellipsis: props.loading ? false : col.ellipsis,
            render(row: any, index: number) {
                // LOADING MODE → override semuanya dengan skeleton
                if (props.loading) {
                    return h(
                        "div",
                        { style: "width:100%; display:flex;" },
                        h(NSkeleton, { text: true, style: "width:100%", height: 20 })
                    )
                }

                // NORMAL MODE → pakai slot atau original render
                if (slots[col.key]) {
                    return h("div", {}, slots[col.key]?.({ row, index }));
                }

                if (originalRender) {
                    return originalRender(row, index);
                }

                return row[col.key] ?? "";
            }
        };
    });
});

</script>
