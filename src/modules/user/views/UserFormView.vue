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
                        <n-breadcrumb-item><n-icon :component="UserMultiple" />
                            Users</n-breadcrumb-item>
                        <n-breadcrumb-item><n-icon :component="FormNew28Regular" />
                            Form</n-breadcrumb-item>
                    </n-breadcrumb>
                </div>
            </div>

        </div>
        <div>
            <UserForm @click:submitted="handleCreateStore" />
        </div>
    </div>
</template>
<script setup lang="ts">
import UserForm from "@module/user/components/UserWithRoleForm.vue";

import { useUserForm } from "@/modules/user/composables/user.form";
import type { MetaHead } from '@/types/metaHead';
import { useHead } from '@unhead/vue';
import { UserMultiple } from '@vicons/carbon';
import { FormNew28Regular } from '@vicons/fluent';
import { SmartHome } from '@vicons/tabler';
import { useDialog, useMessage } from "naive-ui";
import { ref } from 'vue';
import { useRouter } from "vue-router";

interface Props {
    afterSubmit?: 'redirect' | 'emit';
}

const props = withDefaults(defineProps<Props>(), {
    afterSubmit: 'redirect'
});

const dialog = useDialog()
const toast = useMessage()
const router = useRouter()
const { handleCreateStore: createUser } = useUserForm()

const emit = defineEmits<{
    (e: "submitted"): void;
}>();

const handleCreateStore = async (values: any) => {
    dialog.success({
        title: 'Confirmation Create User',
        content: 'Are you sure you want to create this record? Please review the details before proceeding.',
        positiveText: 'Create',
        negativeText: 'Cancel',
        draggable: true,
        onPositiveClick: async () => {
            const { success, message } = await createUser(values)
            if (success) {
                toast.success(message)
                if (props.afterSubmit === 'emit') {
                    emit('submitted')
                } else {
                    router.push({ name: 'users' })
                }
            } else {
                toast.error(message)
            }
        },
    })

}

const meta = ref<MetaHead>({
    title: "Users",
    description: "Create a new user account with required credentials."
})

useHead({
    title: meta.value.title,
    meta: [
        { name: 'description', content: meta.value.description }
    ]
})
</script>