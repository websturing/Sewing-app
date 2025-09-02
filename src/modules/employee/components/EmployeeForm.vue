<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <div class="flex flex-col gap-3">
                <div>
                    <InputLabelWithError :icon="QrCode20Filled" v-model="employeeCode" name="employeeCode"
                        :errors="errors" :readonly="true" label="Employee Code" classContent="!bg-gray-100 !w-45" />
                </div>
                <div class="flex gap-2">
                    <InputLabelWithError v-model="name" name="name" :errors="errors" label="Employee Name"
                        placeholder="Please type name" class="w-200" />
                    <div class="w-30">
                        <label for="gender" class="text-sm font-medium text-gray-700">
                            Gender
                        </label>
                        <n-select style="margin-top:3px" id="gender" size="medium" v-model:value="gender" :options="[{ value: 'male', label: 'Male' },
                        { value: 'female', label: 'Female' }]" />
                    </div>

                    <div class="w-40">
                        <label for="dateBirth" class="text-sm font-medium text-gray-700">
                            Date Birth
                        </label>
                        <n-date-picker id="dateBirth" style="margin-top:3px" v-model:formatted-value="dateBirth"
                            value-format="yyyy-MM-dd" type="date" />
                    </div>

                </div>
                <div class="flex gap-2">
                    <div>
                        <label for="joinDate" class="text-sm font-medium text-gray-700">
                            Join Date
                        </label>
                        <n-date-picker id="joinDate" style="margin-top:3px" v-model:formatted-value="joinDate"
                            value-format="yyyy-MM-dd" type="date" />
                    </div>

                    <InputLabelWithError v-model="position" name="position" :errors="errors" label="Position"
                        placeholder="Please type position employee" />

                    <InputLabelWithError v-model="department" name="department" :errors="errors" label="Department"
                        placeholder="Please type department employee" />

                </div>

                <div class="flex gap-2 mt-10">
                    <div> <n-button :type="props.submitType" icon-placement="right" attr-type="submit" block>
                            <template #icon>
                                <n-icon>
                                    <component :is="props.icon" />
                                </n-icon>

                            </template>
                            {{ props.submitLabel }}
                        </n-button></div>
                </div>
            </div>
        </form>
        {{ props.initialData }}
    </div>
</template>
<script setup lang="ts">
import InputLabelWithError from '@/components/InputLabelWithError.vue';
import { useEmployeeForm } from '@module/employee/composables/employee.form';
import { SaveAnnotation } from "@vicons/carbon";
import { QrCode20Filled } from '@vicons/fluent';
import type { Component } from 'vue';
import type { Employee } from '../schemas/employeeSchema';

interface Props {
    initialData?: Employee,
    submitLabel?: string,
    submitType?: string,
    icon?: Component
}



const props = withDefaults(defineProps<Props>(), {
    submitLabel: "Create Employee",
    submitType: "default",
    icon: SaveAnnotation
})


const emit = defineEmits(['click:submitted'])

const {
    employeeCode,
    name,
    gender,
    dateBirth,
    joinDate,
    position,
    department,
    errors,
    onSubmit
} = useEmployeeForm(props.initialData)



const handleSubmit = onSubmit((values) => {
    emit('click:submitted', values)
})
</script>