<template>
    <div>
        <div class="flex gap-2">
            <div>
                <BaseButton :label="props.labelButtonEdit" :icon="DocumentEdit16Filled" :tertiary="true"
                    @click="handleEditItem(props.row)" type="info" :tooltip="props.labelTooltipEdit"
                    :tooltipShow="true" />
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

const emit = defineEmits<{
    (e: 'click:edit', value: any): void
    (e: 'click:delete', value: any): void
}>();


/**
 * Props
 */

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
    emit("click:edit", row)
}

const handleDeleteItem = (row: any) => {
    emit("click:delete", row)
}



</script>"