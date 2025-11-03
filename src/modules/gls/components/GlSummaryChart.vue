<template>
    <div>
        <VChart :option="GLNumberOptionsEchart" autoresize style="height: 400px;" />
    </div>
</template>
<script setup lang="ts">
import { useGLChart } from '@/modules/gls/composables/gls.chart';
import { onMounted } from 'vue';


const {
    GLNumberOptionsEchart,
    handleFetchGLMatrix
} = useGLChart()

onMounted(async () => {
    await handleFetchGLMatrix({
        glNumber: '65592-01'
    })
})

</script>