<template>
    <div>
        <n-card>
            <div class="flex items-center gap-2">
                <n-icon :component="ChartPerson20Filled" size="24" />
                <p>Leader</p>
            </div>
            <p class="text-3xl font-bold mt-2">
                Administrator
            </p>
        </n-card>
    </div>
</template>
<script setup lang="ts">
import { ChartPerson20Filled } from '@vicons/fluent';
</script>