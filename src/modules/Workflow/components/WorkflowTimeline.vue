<template>
    <div class="px-4">
        <n-timeline v-if="!props.isLoading">
            <n-timeline-item v-for="(step) in props.workflow" :key="step.stepOrder" :type="resolveStatus(step).type">
                <template #icon>
                    <n-icon :size="22">
                        <CheckmarkDoneCircle v-if="resolveStatus(step).done" />
                        <PendingFilled v-else />

                    </n-icon>
                </template>

                <div class="flex flex-col ">
                    <div class="flex flex-col gap-2" v-if="props.isLoading">
                        <n-skeleton width="30%" text />
                        <n-skeleton width="10%" text />
                    </div>
                    <div class="flex flex-col gap-2" v-else>
                        <div class="flex justify-between">
                            <p :class="resolveStatus(step).titleClass">
                                {{ step.workflowName }}
                            </p>
                        </div>
                        <div class="flex gap-2 items-center text-sm text-gray-400">
                            <BaseIconWithLabel :icon="CalendarRtl12Regular" :label="step.createdAt ?? '-'" :size="14" />
                            <BaseIconWithLabel :icon="FolderPerson16Regular" :label="step.createdBy" :size="16" />
                        </div>
                        <div class="flex">
                            <div :class="['text-xs text-gray-500', resolveStatus(step).class]">
                                {{ resolveStatus(step).title }}
                            </div>
                        </div>

                    </div>
                </div>
            </n-timeline-item>
        </n-timeline>

        <n-timeline v-else>
            <n-timeline-item v-for="(step, idx) in 6" :key="step">
                <template #icon>
                    <n-icon :size="22">
                        <PendingFilled />
                    </n-icon>
                </template>

                <div class="flex flex-col ">
                    <div class="flex flex-col gap-2">
                        <n-skeleton width="40%" text />
                        <n-skeleton width="15%" text />
                        <n-skeleton width="5%" text />
                    </div>
                </div>
            </n-timeline-item>
        </n-timeline>
    </div>
</template>


<script setup lang="ts">
import BaseIconWithLabel from '@/components/BaseIconWithLabel.vue';
import type { ReplacementHistoriesWorkflow } from '@/modules/Replacement/schemas/replacement.api.schema';
import { PendingFilled } from '@vicons/carbon';
import { CalendarRtl12Regular, FolderPerson16Regular } from '@vicons/fluent';
import { CheckmarkDoneCircle } from '@vicons/ionicons5';

interface Props {
    workflow: ReplacementHistoriesWorkflow[],
    currentStep: number,
    isLoading: boolean
}

const props = withDefaults(defineProps<Props>(), {
    isLoading: true
})

const resolveStatus = (data: ReplacementHistoriesWorkflow) => {

    // completed
    if (data.isApproved && props.currentStep > data.stepOrder) {
        return {
            type: 'success',
            title: 'Approved',
            class: 'inline-flex px-2 py-0.5 items-center bg-green-100',
            done: true,
            titleClass: 'font-semibold text-black',
            roleClass: 'text-sm text-black',
        }
    }
    if (data.isFinal && data.stepOrder === props.currentStep) {
        return {
            type: 'success',
            title: 'Completed',
            class: 'inline-flex px-2 py-0.5 items-center bg-green-100',
            done: false,
            titleClass: 'font-semibold text-black',
            roleClass: 'text-sm text-orange-400'

        }
    }
    // the active step
    if (data.stepOrder === props.currentStep) {
        return {
            type: 'warning',
            title: 'Progress',
            class: 'inline-flex px-2 py-0.5 items-center bg-yellow-100',
            done: false,
            titleClass: 'font-semibold text-orange-400',
            roleClass: 'text-sm text-orange-400'

        }
    }






    // default
    return {
        type: 'Waiting',
        title: 'Waiting',
        class: 'inline-flex px-2 py-0.5 items-center bg-gray-100',
        done: false,
        titleClass: 'font-regular text-gray-400',
        roleClass: 'text-sm text-gray-400'
    }
}
</script>
