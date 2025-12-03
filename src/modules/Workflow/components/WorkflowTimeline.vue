<template>
    <div class="px-4">
        <n-timeline v-if="!props.isLoading">
            <n-timeline-item v-for="(step, idx) in props.workflow.steps" :key="step.step"
                :type="resolveStatus(step, idx).type">
                <template #icon>
                    <n-icon :size="22">
                        <CheckmarkDoneCircle v-if="resolveStatus(step, idx).done" />
                        <PendingFilled v-else />
                    </n-icon>
                </template>

                <div class="flex flex-col ">
                    <div class="flex flex-col gap-2" v-if="props.isLoading">
                        <n-skeleton width="30%" text />
                        <n-skeleton width="10%" text />
                    </div>
                    <div v-else>
                        <p :class="resolveStatus(step, idx).titleClass">{{
                            step.name
                        }}</p>
                        <p :class="resolveStatus(step, idx).roleClass">{{ step.role }}</p>
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
                        <n-skeleton width="30%" text />
                        <n-skeleton width="10%" text />
                    </div>
                </div>
            </n-timeline-item>
        </n-timeline>
    </div>
</template>


<script setup lang="ts">
import type { WorkFlowWithSteps } from '@/modules/Workflow/schemas/Workflow.api.schema';
import { PendingFilled } from '@vicons/carbon';
import { CheckmarkDoneCircle } from '@vicons/ionicons5';

interface Props {
    workflow: WorkFlowWithSteps,
    currentStep: number,
    isLoading: boolean
}

const props = withDefaults(defineProps<Props>(), {
    isLoading: true
})

const resolveStatus = (step: any, index: number) => {
    const isLastStep = index === props.workflow.steps.length - 1

    // completed
    if (props.currentStep > step.step) {
        return {
            type: 'success',
            done: true,
            titleClass: 'font-semibold text-black',
            roleClass: 'text-sm text-black',
        }
    }

    // the active step
    if (props.currentStep === step.step) {
        return {
            type: 'warning',
            done: false,
            titleClass: 'font-semibold text-orange-400',
            roleClass: 'text-sm text-orange-400'

        }
    }

    // next pending step becomes warning (step + 1)
    if (props.currentStep === step.step && !isLastStep) {
        return {
            type: 'warning',
            done: false,
            titleClass: 'font-semibold text-orange-400',
            roleClass: 'text-sm text-orange-400'
        }
    }

    // default
    return {
        type: '',
        done: false,
        titleClass: 'font-regular text-gray-400',
        roleClass: 'text-sm text-gray-400'
    }
}
</script>
