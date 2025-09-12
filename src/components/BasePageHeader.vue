<!-- components/base/BasePageHeader.vue -->
<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem, NIcon } from "naive-ui"
import type { RouteLocationRaw } from "vue-router"

interface Breadcrumb {
    label: string
    icon?: any
    to?: RouteLocationRaw
}

interface Props {
    title: string
    description?: string
    breadcrumbs?: Breadcrumb[]
}

defineProps<Props>()
</script>

<template>
    <div class="flex justify-between items-center">
        <!-- Title & Description -->
        <div class="w-84 flex-auto">
            <h2 class="text-xl font-bold mb-1">{{ title }}</h2>
            <p v-if="description">{{ description }}</p>
        </div>

        <!-- Breadcrumb -->
        <div class="w-16 flex-auto text-right">
            <n-breadcrumb v-if="breadcrumbs?.length">
                <n-breadcrumb-item v-for="(crumb, i) in breadcrumbs" :key="i">
                    <router-link v-if="crumb.to" :to="crumb.to" class="flex items-center hover:underline">
                        <n-icon v-if="crumb.icon" :component="crumb.icon" class="mr-1" />
                        {{ crumb.label }}
                    </router-link>
                    <template v-else>
                        <n-icon v-if="crumb.icon" :component="crumb.icon" class="mr-1" />
                        {{ crumb.label }}
                    </template>
                </n-breadcrumb-item>
            </n-breadcrumb>
        </div>
    </div>
</template>
