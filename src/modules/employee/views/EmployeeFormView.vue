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
            <n-steps :current="current as number" :status="currentStatus" vertical>
                <n-step title="Employee" description="Personal Detail">
                    <p>Quickly register and onboard new employees.</p>
                    <div class="mt-5 mb-10">
                        <EmployeeForm ref="employeeForm" submitLabel="Create Employee Without User Account"
                            @click:submitted="handleEmployeeCreate" :visible="false"
                            :class="[current == 1 ? '' : 'opacity-25']" />
                    </div>
                </n-step>
                <n-step title="User Account" description="Create a new user account with required credentials">
                    <UserForm ref="userForm" :class="[current == 2 ? '' : 'opacity-25']"
                        :initialData="initialDataUser" />
                </n-step>
                <n-step title="Access Control" description="Assign roles and manage employee permissions." />
            </n-steps>



            <div class="flex justify-end gap-3">
                <BaseButton label="Create Employee Without User Account" @click="submitFromOutside" class="pr-10" />
                <BaseButton label="Prev" :icon="ArrowPrevious20Filled" @click="handlePrev" :disabled="current === 1" />
                <BaseButton :label="current == 3 ? 'Apply Changes' : 'Next'"
                    :icon="current === 3 ? SaveAnnotation : Next28Filled" icon-placement="right"
                    :type="current == 3 ? 'success' : 'info'" @click="handleNext" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";
import EmployeeForm from "@/modules/employee/components/EmployeeForm.vue";
import type { User } from "@/modules/user/schemas/user.schema";
import { useEmployee } from "@module/employee/composables/useEmployee";
import UserForm from "@module/user/components/UserForm.vue";
import { useHead } from '@unhead/vue';
import { SaveAnnotation } from "@vicons/carbon";
import { ArrowPrevious20Filled, ContactCardGroup16Regular, FormNew28Regular, Next28Filled } from '@vicons/fluent';
import { SmartHome } from '@vicons/tabler';
import type { StepsProps } from 'naive-ui';
import { useDialog } from 'naive-ui';
import { ref, watch } from "vue";
import type { Employee } from "../schemas/employeeSchema";
const { meta } = useEmployee()

const employeeForm = ref()
const userForm = ref()
const employeeData = ref<Employee | null>(null)
const userData = ref<User | null>(null)
const dialog = useDialog()
const initialDataUser = ref({
    name: "",
    email: ""
})

const checkName = () => {
    initialDataUser.value.name = employeeForm.value?.name
}
const { handleCreateEmployee } = useEmployee()

/** STEP WIZARD */
const current = ref<number | null>(1)
const currentStatus = ref<StepsProps['status']>('process')


/** STEP WIZARD CONTROL */


const handleEmployeeCreate = async (values: Employee) => {
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
function submitFromOutside() {
    employeeForm.value?.submit()
}

const handlePrev = () => {
    if (current.value === null || current.value === 1) {
        current.value = null
    } else {
        current.value!--
    }
}

const handleNext = async () => {
    if (current.value === null) {
        current.value = 1
        return
    }

    if (current.value === 1) {
        const { valid, values } = await employeeForm.value?.validateForm()
        if (!valid) return
        employeeData.value = values
    }

    if (current.value === 2) {
        const { valid, values } = await userForm.value?.validateForm()
        if (!valid) return
        userData.value = values
    }


    if (current.value < 3) {
        current.value++
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

watch(
    () => employeeForm.value?.name,
    (newVal: any) => {
        checkName()
    }
);


</script>