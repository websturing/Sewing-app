<template>
    <div class="flex flex-col gap-2">
        <DefectSummaryCard />
        <DefectGroupGlNumberTable />
    </div>
</template>
<script setup lang="ts">
import DefectGroupGlNumberTable from "@/modules/defect/components/DefectGroupGlNumberTable.vue";
import DefectSummaryCard from '@/modules/defect/components/DefectSummaryCard.vue';
import { useDefectPage } from '@/modules/defect/composables/defect.page';
import { onMounted } from 'vue';

const {
    handleFetchSummaryGroupLines,
    handleFetchGroupGlNumber
} = useDefectPage()

onMounted(async () => {
    await handleFetchSummaryGroupLines()
    await handleFetchGroupGlNumber()
})
</script>