<template>
    <div>
        <div class="flex justify-between gap-2">
            <div class="">
                <BaseInput :icon="SearchOutline" placeholder="Search" :model-value="props.modelValue"
                    @update:modelValue="(val) => emit('update:modelValue', val)" />

            </div>
            <div class="flex gap-2">
                <BaseButton label="Export" :icon="DocumentExport" @click="emit('click:export')" :tertiary="true"
                    type="primary" />

                <BaseButton label="Refresh" :icon="RefreshRound" @click="emit('click:refresh')" :tertiary="true"
                    type="warning" />

            </div>
        </div>
    </div>

</template>
<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";
import BaseInput from "@/components/BaseInput.vue";
import { DocumentExport } from "@vicons/carbon";
import { SearchOutline } from "@vicons/ionicons5";
import { RefreshRound } from "@vicons/material";



const props = defineProps<{
    modelValue: string
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
    (e: 'click:export'): void
    (e: 'click:refresh'): void
}>()



</script>