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
                <BaseButton label="Create Employee" :icon="Create" type="primary"
                    @click="router.push({ name: 'employee-form' })" />
            </div>
        </div>

        <BaseDatable :columns="columns" :data="rows" :loading="loading">
            <template #actions="{ row }">
                <BaseDatatableButton :row="row" label-button-delete="Delete" @click:edit="handleEditModal"
                    @click:delete="handleDeleteEmployee(row.id)" />
            </template>
        </BaseDatable>

        <div class="flex justify-end mt-4">
            <n-pagination :page="tableMeta.currentPage" :page-size="tableMeta.perPage" :page-count="tableMeta.lastPage"
                show-size-picker :page-sizes="[5, 10, 20, 50]" @update:page="handlePageChange"
                @update:page-size="handlePageSizeChange" />
        </div>

        <n-modal v-model:show="modalForm" :on-after-leave="handleCancelModal" :closable="true" preset="card"
            style="width: 900px">
            <template #header>
                <h6>{{ title }}</h6>
                <p class="text-sm text-gray-400 font-normal">{{ subtitle }}</p>
            </template>
            <EmployeeForm :initialData="initialData" @click:submitted="handleEmployeeSubmit" :submitLabel="labelForm"
                submitType="success" />
        </n-modal>


    </div>
</template>

<script setup lang="ts">
import BaseAdvanceFilter from '@/components/BaseAdvanceFilter.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseDatable from '@/components/BaseDatable.vue';
import BaseDatatableButton from '@/components/BaseDataTableButton.vue';
import EmployeeForm from '@module/employee/components/EmployeeForm.vue';
import { useEmployeeForm } from "@module/employee/composables/employee.form";
import { useEmployeeTable } from '@module/employee/composables/employee.table';
import { useEmployee } from "@module/employee/composables/useEmployee";
import { useHead } from '@unhead/vue';
import { ContactCardGroup16Regular } from '@vicons/fluent';
import { Create } from '@vicons/ionicons5';
import { SmartHome } from '@vicons/tabler';
import { onMounted, ref } from 'vue';
import { useRouter } from "vue-router";
import type { Employee } from '@/modules/employee/schemas/employeeSchema';


const router = useRouter()
const { meta } = useEmployee()
const initialData = ref<any | null>(null)
const modalForm = ref<boolean>(false)
const labelForm = ref<string>("Create Employee")
const title = ref<string>("Create Employee")
const subtitle = ref<string>("Quickly register and onboard new employees.")

const handleExportModal = () => {
    alert('this feature coming soon')
}

const handleEditModal = (row: any) => {
    initialData.value = row
    modalForm.value = true
    title.value = "Edit Employee"
    subtitle.value = "Update existing employee details and records."
    labelForm.value = "Apply Changes"
}

const handleDeleteEmployee = (id: number) => {
    deleteEmployee(id)
}

const handleCancelModal = () => {
    title.value = "Create Employee"
    subtitle.value = "Quickly register and onboard new employees."
    labelForm.value = "Create Employee"
    initialData.value = null
    modalForm.value = false
}


const handleEmployeeSubmit = async (employee: Employee) => {
    await updateEmployee(initialData.value.id, employee)
    handleCancelModal()
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

const {
    updateEmployee,
    deleteEmployee
} = useEmployeeForm()

onMounted(() => {
    handleFetchEmployee()
})

useHead({
    title: meta.value.title,
    meta: [
        { name: 'description', content: meta.value.description }
    ]
})



</script>