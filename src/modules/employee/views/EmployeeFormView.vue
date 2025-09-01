<template>
    <div class="flex flex-col gap-10">
        <div class="bg-gray-50 p-5 rounded-md">
            <div class="flex justify-between items-center">
                <div class="w-84 flex-auto">
                    <h2 class="text-xl font-bold mb-1">{{ meta.title }}</h2>
                    <p>{{ meta.description }}</p>
                </div>
                <div class="w-16 flex-auto text-right">
                    <n-breadcrumb>
                        <n-breadcrumb-item><n-icon :component="SmartHome" /> Home</n-breadcrumb-item>
                        <n-breadcrumb-item><n-icon :component="ContactCardGroup16Regular" />
                            Employee</n-breadcrumb-item>
                        <n-breadcrumb-item><n-icon :component="FormNew28Regular" />
                            Form</n-breadcrumb-item>
                    </n-breadcrumb>
                </div>
            </div>

        </div>

        <EmployeeForm />
    </div>
</template>

<script setup lang="ts">
import EmployeeForm from "@module/employee/components/EmployeeForm.vue";
import { useEmployee } from "@module/employee/composables/useEmployee";
import { useHead } from '@unhead/vue';
import { ContactCardGroup16Regular, FormNew28Regular } from '@vicons/fluent';
import { SmartHome } from '@vicons/tabler';
const { meta } = useEmployee()

meta.value.description = "Quickly register and onboard new employees."
useHead({
    title: "Employee Form",
    meta: [
        { name: 'description', content: meta.value.description }
    ]
})

</script>