<template>
    <div>keader</div>
</template>
<script setup lang="ts">
import { useLeadersPage } from "@/modules/leaders/composables/leaders.page";
import { onMounted } from 'vue';

const {
    fetchSummaryByLeader
} = useLeadersPage()

onMounted(async () => {
    await fetchSummaryByLeader()
})
</script>