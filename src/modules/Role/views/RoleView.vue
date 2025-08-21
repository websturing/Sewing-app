<template>
    <div>
        <RoleTableView @edit="handleEdit" @create="handleCreate" />
        <n-modal v-model:show="showForm" :on-after-leave="handleCancel" :closable="true" :title="title" preset="card"
            style="width: 900px">
            <RoleFormView @submitted="handleFormSubmitted" :initialData="initialData" />
        </n-modal>
    </div>
</template>
<script setup lang="ts">
import RoleFormView from "@module/Role/components/RoleForm.vue";
import RoleTableView from "@module/Role/components/RoleTable.vue";
import type { RoleUpdate } from "@module/Role/schemas/RoleSchema";
import { ref } from "vue";

const initialData = ref<any | null>(null)
const showForm = ref(false)
const title = ref('New Role')
const handleEdit = (row: RoleUpdate) => {
    title.value = "Edit Role"
    initialData.value = row
    showForm.value = true
}

const handleCreate = () => {
    title.value = "Create Role"
    showForm.value = true
}

const handleFormSubmitted = () => {
    title.value = "Create Role"
    showForm.value = false
}

const handleCancel = () => {
    initialData.value = null
}


</script>