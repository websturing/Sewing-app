<template>
    <n-space vertical :size="12">
        <n-data-table :bordered="true" :single-line="false" :columns="props.columns" :data="data" :pagination="false"
            :loading="props.loading" />
    </n-space>
</template>

<script setup lang="ts">
import type { DataTableColumns } from "naive-ui";

interface Props<T = any> {
    columns: DataTableColumns<T>;
    data: T[];
    loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    loading: true
});


</script>
