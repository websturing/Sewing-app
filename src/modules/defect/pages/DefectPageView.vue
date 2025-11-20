<template>
    <div>Defect data</div>
</template>
<script setup lang="ts">
import { useDefectStore } from '@/modules/defect/stores/defect.store';
import { onMounted } from 'vue';


const store = useDefectStore();

onMounted(() => {
    store.fetchSummaryGroupLines()
})
</script>