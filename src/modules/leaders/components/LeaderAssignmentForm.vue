<template>
    <div>
        <form @submit.prevent="onSubmit1">
            <div class="flex flex-col gap-5 ">
                <div class="mb-5">
                    <p class="text-xl font-semibold">Leader Assignment Form</p>
                    <p>A dedicated form interface for assigning leaders to specific production lines.</p>
                </div>

                <div class="flex gap-2 items-end">
                    <BaseSelectWithError name="userId" :options="optionUsers" label="Leaders" v-model="userId"
                        placeholder="Select Leader" :errors="errors" />

                    <BaseSelectWithError name="lineId" :options="optionLines" multiple label="Lines" v-model="lineId"
                        placeholder="Select Lines" :errors="errors" />
                    <div class="flex flex-col">
                        <label id="isActive" class="mb-2 font-semibold">Is Active</label>
                        <n-switch :round="false" size="large" v-model:value="isActive" />
                    </div>
                </div>

                <div class="bg-gray-50 border border-gray-200 p-3 rounded-lg">
                    <p class="text-xs text-gray-400">Selected Lines</p>
                    <div class="flex gap-2 flex-wrap mt-2">
                        <n-tag v-for="id in lineId" :key="id" size="small" type="info" round>
                            {{optionLines.find(o => o.value === id)?.label}}
                        </n-tag>
                    </div>
                </div>
                <div class="flex gap-2 justify-end">
                    <BaseButton label="Reset" @click="resetForm" type="error" quaternary />
                    <BaseButton label="Assign Leader" :icon="SaveArrowRight20Filled" icon-placement="right"
                        :loading="isLoading" type="primary" attrType="submit" />
                </div>
            </div>
        </form>
    </div>
</template>
<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import BaseSelectWithError from '@/components/BaseSelectWithError.vue';
import { useLeadersForm } from '@/modules/leaders/composables/leaders.form';
import { useLeadersPage } from "@/modules/leaders/composables/leaders.page";
import type { AssignLeaderForm } from '@/modules/leaders/schemas/leaders.form.schema';
import { SaveArrowRight20Filled } from '@vicons/fluent';
import { onMounted } from 'vue';

const props = defineProps<{
    modal?: boolean
    initialData?: AssignLeaderForm
}>()


const {
    isLoading,
    userId,
    lineId,
    isActive,
    optionLines,
    optionUsers,
    onSubmit,
    errors,
    resetForm,
    handleUserLineData,
    handleCreateAssignLeader
} = useLeadersForm(props.initialData)

const {
    fetchSummaryByLeader
} = useLeadersPage()

const onSubmit1 = onSubmit(async (values) => {
    await handleCreateAssignLeader(values)
    await fetchSummaryByLeader()
    updateValue(false)
})


const emit = defineEmits<{
    'update:modal': [value: boolean]
}>()

const updateValue = (value: boolean) => {
    emit('update:modal', value)
}


onMounted(async () => {
    await handleUserLineData()
})

</script>