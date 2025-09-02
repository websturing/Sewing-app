<template>
    <div>
        <div class="flex gap-2">
            <div>
                <n-tooltip trigger="hover">
                    <template #trigger>
                        <BaseButton :label="props.labelButtonEdit" :icon="DocumentEdit16Filled" :tertiary="true"
                            @click="handleEditItem(props.row)" type="info" />
                    </template>
                    {{ props.labelTooltipEdit }}
                </n-tooltip>
            </div>
            <div>
                <n-popconfirm @positive-click="handleDeleteItem(props.row)">
                    <template #trigger>
                        <BaseButton :label="props.labelButtonDelete" :icon="Delete" type="error" />
                    </template>
                    Are you sure to delete this record?
                </n-popconfirm>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Delete } from '@vicons/carbon';
import { DocumentEdit16Filled } from '@vicons/fluent';
import BaseButton from './BaseButton.vue';

interface Props {
    row?: any,
    labelTooltipEdit?: string,
    labelButtonEdit?: string,
    labelButtonDelete?: string,
}


const props = withDefaults(defineProps<Props>(), {
    labelTooltipEdit: "Edit Item",
    labelButtonEdit: "",
    labelButtonDelete: "",
})

const handleEditItem = (row: any) => {
    alert(JSON.stringify(row))
}

const handleDeleteItem = (row: any) => {
    alert(JSON.stringify(row))
}



</script>"