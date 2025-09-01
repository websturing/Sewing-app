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

        <div class="p-5 flex flex-col gap-10">
            <n-steps :current="current as number" :status="currentStatus">
                <n-step title="Employee" description="Personal Detail" />
                <n-step title="User Account" description="Create a new user account with required credentials" />
                <n-step title="Access Control" description="Assign roles and manage employee permissions." />
            </n-steps>



            <EmployeeForm submitLabel="Create Employee Without User Account" @click:submitted="handleEmployeeCreate" />
            <div class="flex justify-end gap-3">
                <BaseButton label="Prev" :icon="ArrowPrevious20Filled" @click="handlePrev" :disabled="current === 1" />
                <BaseButton :label="current == 3 ? 'Apply Changes' : 'Next'"
                    :icon="current === 3 ? SaveAnnotation : Next28Filled" icon-placement="right"
                    :type="current == 3 ? 'success' : 'info'" @click="handleNext" />
            </div>
            {{ currentStatus }}
        </div>
    </div>
</template>

<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";
import EmployeeForm from "@module/employee/components/EmployeeForm.vue";
import { useEmployee } from "@module/employee/composables/useEmployee";
import { useHead } from '@unhead/vue';
import { SaveAnnotation } from "@vicons/carbon";
import { ArrowPrevious20Filled, ContactCardGroup16Regular, FormNew28Regular, Next28Filled } from '@vicons/fluent';
import { SmartHome } from '@vicons/tabler';
import type { StepsProps } from 'naive-ui';
import { useDialog, useMessage } from 'naive-ui';
import { ref } from "vue";
import type { Employee } from "../schemas/employeeSchema";
const { meta } = useEmployee()

const message = useMessage()
const dialog = useDialog()

const { handleCreateEmployee } = useEmployee()

/** STEP WIZARD */

const current = ref<number | null>(1)
const currentStatus = ref<StepsProps['status']>('process')

const handleEmployeeCreate = (values: Employee) => {
    dialog.warning({
        title: 'No User Account Detected',
        content: 'This employee doesn’t have a user account yet. Do you still want to save? You can assign one later to provide access.',
        positiveText: 'Sure',
        negativeText: 'Not Sure',
        draggable: true,
        onPositiveClick: async () => {
            // alert(values);
            handleCreateEmployee(values)
        },
    })
}


const handlePrev = () => {
    if (current.value === null || current.value === 1) {
        current.value = null
    } else {
        current.value!--
    }
}

const handleNext = () => {
    if (current.value === null) {
        current.value = 1
    } else if (current.value < 3) {
        current.value!++
    }
}

/** COMPOSABLE EMPLOYEE FORM */


meta.value.description = "Quickly register and onboard new employees."
useHead({
    title: "Employee Form",
    meta: [
        { name: 'description', content: meta.value.description }
    ]
})

</script>