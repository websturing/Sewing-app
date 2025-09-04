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
                        <n-icon :component="UserMultiple" />
                    </n-breadcrumb-item>
                </n-breadcrumb>
            </div>
        </div>
        <user-table create-mode="emit" @created="handleSubmitUserForm" />

        <n-modal v-model:show="isModalForm" :closable="true" preset="card" style="width: 900px">
            <UserForm @submitted="handleSubmitUserForm" after-submit="emit" />
        </n-modal>

    </div>
</template>

<script setup lang="ts">
import UserTable from '@/modules/user/components/UserTable.vue';
import UserForm from '@/modules/user/views/UserFormView.vue';
import type { MetaHead } from '@/types/metaHead';
import { useHead } from '@unhead/vue';
import { UserMultiple } from '@vicons/carbon';
import { SmartHome } from '@vicons/tabler';
import { ref } from 'vue';

const isModalForm = ref<boolean>(false)

const handleSubmitUserForm = () => {
    isModalForm.value = true
}

const meta = ref<MetaHead>({
    title: "Users",
    description: "The User module provides a centralized system to manage application accounts and authentication. It allows administrators to create, edit, and deactivate user accounts while maintaining secure access to the platform. This module supports role assignments, ensuring that users have the right access level and a seamless login experience."
})

useHead({
    title: meta.value.title,
    meta: [
        { name: 'description', content: meta.value.description }
    ]
})
</script>