<template>
    <div class="flex flex-col gap-2">
        <DefectSummaryCard />
        <DefectGroupLineTable />
    </div>
</template>
<script setup lang="ts">
import DefectGroupLineTable from "@/modules/defect/components/DefectGroupLineTable.vue";
import DefectSummaryCard from '@/modules/defect/components/DefectSummaryCard.vue';
import { useDefectPage } from '@/modules/defect/composables/defect.page';
import { onMounted } from 'vue';

const {
    handleFetchSummaryGroupLines,
    handleFetchGroupLines
} = useDefectPage()

onMounted(async () => {
    await handleFetchSummaryGroupLines()
    await handleFetchGroupLines()
})
</script>