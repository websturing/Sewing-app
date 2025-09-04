<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <div class="flex gap-2">
                <div>
                    <InputLabelWithError name="name" :errors="errors" label="Name" v-model="name" />
                </div>
                <div>
                    <InputLabelWithError name="email" :errors="errors" label="Email" v-model="email" />
                </div>
                <div class="w-100">
                    <SelectLabelWithError v-model="roleNames" name="roleNames" :options="optionRoles" :multiple="true"
                        :errors="errors" label="Roles Name" />
                </div>
            </div>
            <div :class="[props.placmentEnd ? 'justify-end' : '', 'flex gap-2 mt-10']" v-if="props.visible">
                <div>
                    <n-button :type="props.submitType" icon-placement="right" attr-type="submit" block>
                        <template #icon>
                            <n-icon>
                                <component :is="props.icon" />
                            </n-icon>

                        </template>
                        {{ props.submitLabel }}
                    </n-button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import InputLabelWithError from '@/components/InputLabelWithError.vue';
import SelectLabelWithError from '@/components/SelectLabelWithError.vue';
import { useRoleStore } from '@/modules/Role/stores/Role';
import { useUserForm } from '@/modules/user/composables/user.form';
import type { User } from '@/modules/user/schemas/user.schema';
import { SaveAnnotation } from "@vicons/carbon";
import type { Component } from 'vue';
import { computed, onMounted, ref, watch } from 'vue';

const emit = defineEmits(['click:submitted'])
const storeRoles = useRoleStore()

const optionRoles = computed(() => {
    return storeRoles.data.map((e) => {
        return {
            value: e.name,
            label: e.name
        }
    })
})
const nameReadonly = ref<boolean>(false)
interface Props {
    initialData?: User,
    isEdit?: boolean,
    submitLabel?: string,
    submitType?: string,
    placmentEnd?: boolean,
    visible?: boolean,
    icon?: Component
}
const props = withDefaults(defineProps<Props>(), {
    isEdit: false,
    submitLabel: "Create Employee",
    submitType: "default",
    visible: true,
    placmentEnd: false,
    icon: SaveAnnotation
})

const {
    name,
    email,
    errors,
    roleNames,
    validateForm,
    onSubmit
} = useUserForm(props.initialData)

const handleSubmit = onSubmit((values) => {
    emit('click:submitted', values)
})

watch(
    () => props.initialData,
    (newVal) => {
        if (newVal) {
            name.value = newVal.name
        } else if (!props.isEdit) {
            nameReadonly.value = true
        } else {
            name.value = ""
        }
    },
    { deep: true }
)

defineExpose({
    name,
    validateForm,
    submit: handleSubmit
})

onMounted(() => {
    storeRoles.fetchRole()
})

</script>