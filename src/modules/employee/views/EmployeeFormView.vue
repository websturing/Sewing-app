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
            <form @submit.prevent="onSubmit">
                <n-steps :current="current as number" :status="currentStatus" vertical>
                    <n-step title="Employee" description="Personal Detail">
                        <p>Quickly register and onboard new employees.</p>
                        <div class="mt-5 mb-10">
                            <EmployeeForm ref="employeeForm" submitLabel="Create Employee Without User Account"
                                @click:submitted="handleEmployeeCreate" :visible="false" :icon="UserAddOutlined"
                                :class="[current == 1 ? '' : 'opacity-25']" />
                        </div>
                    </n-step>
                    <n-step title="User Account" description="Create a new user account with required credentials">
                        <UserForm ref="userForm" :class="[current == 2 ? '' : 'opacity-25']"
                            :initialData="initialDataUser" :visible="false" />
                    </n-step>
                    <n-step title="Access Control" description="Assign roles and manage employee permissions.">
                        <div :class="[current == 3 ? '' : 'opacity-25', 'mt-5 mb-10']">
                            <SelectLabelWithError v-model="selectedRoles" name="roles" :options="optionRoles"
                                :multiple="true" :errors="errors" label="Roles Name" />
                        </div>
                    </n-step>
                </n-steps>
            </form>
            <div class="flex justify-end gap-3">
                <BaseButton label="Create Employee Without User Account" @click="submitFromOutside" class="pr-10"
                    :icon="UserAddOutlined" />
                <BaseButton label="Prev" :icon="ArrowPrevious20Filled" @click="prev" :disabled="current === 1" />
                <BaseButton :label="current == 3 ? 'Apply Changes' : 'Next'"
                    :icon="current === 3 ? SaveAnnotation : Next28Filled" icon-placement="right"
                    :type="current == 3 ? 'success' : 'info'" @click="next(validators)" />
            </div>
        </div>
        <ProgressModal v-model:show="isProgressModalOpen" :title="progressModal.title" :error="progressModal.error"
            :description="progressModal.description" />
    </div>
</template>

<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";
import ProgressModal from "@/components/ProgressModal.vue";
import SelectLabelWithError from "@/components/SelectLabelWithError.vue";
import { useStepWizard } from "@/composables/useStepWizard";
import EmployeeForm from "@/modules/employee/components/EmployeeForm.vue";
import { useEmployeeStore } from "@/modules/employee/stores/employee.store";
import { useRoleTable } from "@/modules/Role/composables/useRoleTable";
import type { User } from "@/modules/user/schemas/user.schema";
import { useUserStore } from "@/modules/user/stores/user.store";
import { useEmployee } from "@module/employee/composables/useEmployee";
import UserForm from "@module/user/components/UserForm.vue";
import { useHead } from '@unhead/vue';
import { toFormValidator } from '@vee-validate/zod';
import { UserAddOutlined } from "@vicons/antd";
import { SaveAnnotation } from "@vicons/carbon";
import { ArrowPrevious20Filled, ContactCardGroup16Regular, FormNew28Regular, Next28Filled } from '@vicons/fluent';
import { SmartHome } from '@vicons/tabler';
import { useDialog } from 'naive-ui';
import { useField, useForm } from 'vee-validate';
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { z } from 'zod';
import type { Employee } from "../schemas/employeeSchema";

const router = useRouter()
const storeUser = useUserStore()
const storeEmployee = useEmployeeStore()
const { meta } = useEmployee()
const isProgressModalOpen = ref(false)
const progressModal = reactive({
    title: "Creating Employee Personal Detail",
    description: "Please wait while we are creating the new record. This may take a few seconds.",
    error: false
})
const employeeForm = ref()
const userForm = ref()
const employeeData = ref<Employee>({} as Employee)
const userData = ref<User>({} as User)

const dialog = useDialog()
const initialDataUser = ref({
    name: "",
    email: "",
    roleNames: []
})

const { handleCreateEmployee } = useEmployee()

/** Validation */
const validationSchema = toFormValidator(
    z.object({
        roles: z.array(z.string()).min(1, 'Pilih minimal 1 role')
    })
)

const { errors, handleSubmit, validate } = useForm({
    validationSchema
})
const onSubmit = handleSubmit(async () => {
    progressModal.error = false
    userData.value.roleNames = selectedRoles.value
    const { id: userId, success, message } = await storeUser.create(userData.value)

    if (!success) {
        progressModal.title = message
        progressModal.error = true
        return
    }

    progressModal.title = "creating Employee Account"
    employeeData.value.userId = userId
    const { success: scsEm, message: msg } = await storeEmployee.createEmployee(employeeData.value)
    if (!scsEm) {
        progressModal.title = msg
        progressModal.error = true
        return
    }

    setTimeout(() => {
        isProgressModalOpen.value = false
        router.push({ name: 'employee' })
    }, 3000)
})



const { value: selectedRoles } = useField<string[]>('roles', undefined, {
    initialValue: []
})

/** Role */
const { fnRefresh, data } = useRoleTable()
const optionRoles = computed(() => {
    return data.value.map((e) => {
        return {
            value: e.name,
            label: e.name
        }
    })
})


/** STEP WIZARD */
const { current, currentStatus, next, prev } = useStepWizard(3)
const validators = [
    async () => {
        const { valid, values } = await employeeForm.value?.validateForm()
        if (!valid) return false
        employeeData.value = values
        return true
    },
    async () => {
        const { valid, values } = await userForm.value?.validateForm()
        if (!valid) return false
        userData.value = values
        return true
    },
    async () => {
        const { valid } = await validate()
        if (!valid) return false

        dialog.success({
            title: 'Confirmation Create Employee',
            content: 'Are you sure you want to create this record? Please review the details before proceeding.',
            positiveText: 'Create',
            negativeText: 'Cancel',
            draggable: true,
            onPositiveClick: async () => {
                isProgressModalOpen.value = true
                onSubmit()
            },
        })
        return true
    }
]

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


onMounted(async () => {
    await fnRefresh()
})

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
    () => {
        initialDataUser.value.name = employeeForm.value?.name
    }
);


</script>