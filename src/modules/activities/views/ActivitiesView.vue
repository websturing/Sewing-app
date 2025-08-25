<template>
    <div>
        <div class="flex justify-between items-center">
            <div class="w-64 flex-auto">
                <h2 class="text-xl font-bold mb-1">Audit Trail</h2>
                <p>This module records, stores, and displays all user activities within the application. Key actions
                    such as
                    login, data updates, entity creation or deletion, and administrative operations are logged in detail
                    to
                    support auditing, monitoring, and system security.</p>
            </div>
            <div class="w-36 flex-auto text-right">
                <n-breadcrumb>
                    <n-breadcrumb-item><n-icon :component="HomeOutline" /> Home</n-breadcrumb-item>
                    <n-breadcrumb-item>
                        <n-icon :component="AnalyticsOutline" /> Audit Trails
                    </n-breadcrumb-item>
                </n-breadcrumb>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';
import { AnalyticsOutline, HomeOutline } from '@vicons/ionicons5';

useHead({
    title: `Audit Trail`,
    meta: [
        { name: 'description', content: 'This module records, stores, and displays all user activities within the application. Key actions such as login, data updates, entity creation or deletion, and administrative operations are logged in detail to support auditing, monitoring, and system security.' }
    ]
})
</script>