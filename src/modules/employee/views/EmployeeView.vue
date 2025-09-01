<template>
    <div class="flex flex-col gap-8">
        <div class="flex justify-between items-center">
            <div class="w-84 flex-auto">
                <h2 class="text-xl font-bold mb-1">{{ meta.title }}</h2>
                <p>{{ meta.description }}</p>
            </div>
            <div class="w-16 flex-auto text-right">
                <n-breadcrumb>
                    <n-breadcrumb-item><n-icon :component="SmartHome" /> Home</n-breadcrumb-item>
                    <n-breadcrumb-item>
                        <n-icon :component="ContactCardGroup16Regular" />
                    </n-breadcrumb-item>
                </n-breadcrumb>
            </div>
        </div>


        <div class="flex gap-10">
            <div class="flex-1">
                <BaseAdvanceFilter v-model="search" v-model:dateRange="dateRange" @click:export="handleExportModal"
                    @click:refresh="handleRefresh" />
            </div>
            <div class="">
                <BaseButton label="Create Employee" :icon="Create" type="primary" />
            </div>
        </div>

        <BaseDatable :columns="columns" :data="rows" :loading="loading" />

        <div class="flex justify-end mt-4">
            <n-pagination :page="tableMeta.currentPage" :page-size="tableMeta.perPage" :page-count="tableMeta.lastPage"
                show-size-picker :page-sizes="[5, 10, 20, 50]" @update:page="handlePageChange"
                @update:page-size="handlePageSizeChange" />
        </div>
    </div>
</template>

<script setup lang="ts">
import BaseAdvanceFilter from '@/components/BaseAdvanceFilter.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseDatable from '@/components/BaseDatable.vue';
import { useEmployeeTable } from '@module/employee/composables/employee.table';
import { useEmployee } from "@module/employee/composables/useEmployee";
import { useHead } from '@unhead/vue';
import { ContactCardGroup16Regular } from '@vicons/fluent';
import { Create } from '@vicons/ionicons5';
import { SmartHome } from '@vicons/tabler';
import { onMounted } from 'vue';

const { meta } = useEmployee()

const handleExportModal = () => {
    alert('this feature coming soon')
}




const {
    handleFetchEmployee
} = useEmployee()
const {
    search,
    dateRange,
    loading,
    columns,
    rows,
    meta: tableMeta,
    handleRefresh,
    handlePageChange,
    handlePageSizeChange
} = useEmployeeTable()



onMounted(() => {
    handleFetchEmployee()
})

useHead({
    title: meta.title,
    meta: [
        { name: 'description', content: meta.description }
    ]
})



</script>