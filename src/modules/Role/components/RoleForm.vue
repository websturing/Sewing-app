<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <InputWithError v-model="moduleName" name="name" :errors="errors" label="Role Name" />

            <n-space vertical class="mt-5">
                <p class="text-gray-400">Manage Permission</p>
                <n-table :single-line="false">
                    <thead>
                        <tr>
                            <th class="!text-center" width="20px">No</th>
                            <th>Module Name</th>
                            <th class="!text-center">View</th>
                            <th class="!text-center">Create</th>
                            <th class="!text-center">Update</th>
                            <th class="!text-center">Delete</th>
                            <th class="!text-center">Upload</th>
                            <th class="!text-center">Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(item, index) in permissionData">
                            <RolesPermissionRowTable :item="item" :index="index + 1" :level="0"
                                v-model:permissionCheckBox="permissionCheckBox" />
                        </template>
                    </tbody>
                </n-table>
                <n-card content-class="bg-red-100" v-if="errors.permissions">
                    {{ errors.permissions }}
                </n-card>
            </n-space>
            <n-space class="mt-10" justify="end">
                <n-button type="success" icon-placement="right" attr-type="submit" block>
                    <template #icon>
                        <n-icon>
                            <SendOutline />
                        </n-icon>
                    </template>
                    {{ isEdit ? 'Apply Changes' : 'Create New' }}
                </n-button>
            </n-space>
        </form>
    </div>
</template>
<script setup lang="ts">
import InputWithError from '@/components/InputLabelWithError.vue';
import { useModuleStore } from '@/modules/permission/stores/permission';
import { useRoleForm } from '@/modules/Role/composables/useRoleForm';
import RolesPermissionRowTable from "@module/Role/components/RolesPermissionRowTable.vue";
import { SendOutline } from '@vicons/ionicons5';
import { onMounted } from 'vue';

const moduleStore = useModuleStore()

const props = defineProps<{
    initialData?: {
        id?: number
        name: string
        guardName: string
        permissions?: Array<number>
    }
}>()

const emit = defineEmits(['submitted'])

// Wrap submit dan emit di komponen Vue ini
const handleSubmit = async () => {
    await onSubmit()
    emit('submitted')

}


onMounted(async () => {
    try {
        await moduleStore.fetchModuleWithPermissions()
    } catch (error) {
        console.error('Error fetching modules:', error)
    }
})


const {
    name: moduleName,
    permissions: permissionCheckBox,
    errors,
    onSubmit,
    isEdit,
    resetForm,
    permissionData,
} = useRoleForm(props.initialData)
</script>