<template>
    <div>
        <n-card>
            <div class="flex items-center gap-2">
                <n-icon :component="GroupAccess" size="24" />
                <p>Employee Attend</p>
            </div>
            <p class="text-3xl font-bold mt-2">125</p>

            <div class="flex items-center gap-5">
                <p>Last Week</p>
                <p class="bg-green-50 rounded px-3">
                    <n-icon size="16" :component="IosTrendingUp" class="text-green-500" />
                    2,5%
                </p>
            </div>
        </n-card>
    </div>
</template>
<script setup lang="ts">
import { GroupAccess } from '@vicons/carbon';
import { IosTrendingUp } from '@vicons/ionicons4';
</script>