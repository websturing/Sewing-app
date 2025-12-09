<template>
    <div class="px-4">

        <!-- Horizontal Scrollable Cards -->
        <n-scrollbar ref="scrollbarRef" x-scrollable style="max-width: 100%">
            <div class="flex gap-3 pb-3" style="min-width: max-content;">
<<<<<<< HEAD
                <n-card v-for="step in props.workflow" :key="step.stepOrder"
                    :ref="(el) => setStepRef(el, step.stepOrder)" :class="[
                        '!w-[280px] !min-w-[280px] transition-all duration-300',
                        isCurrentStep(step.stepOrder)
                            ? '!border-2 !border-orange-400 !shadow-lg'
                            : '!border !border-gray-200'
                    ]">
                    <div class="flex flex-col gap-2">
                        <p :class="resolveStatus(step).titleClass">{{ step.workflowName }}</p>

                        <div class="flex">
                            <div :class="['text-xs rounded', resolveStatus(step).class]">
                                {{ resolveStatus(step).title }}
                            </div>
                        </div>

                        <div class="flex flex-col gap-1 text-gray-500">
                            <BaseIconWithLabel :icon="CalendarRtl12Regular" :label="step.createdAt ?? '-'" :size="14" />
                            <BaseIconWithLabel :icon="FolderPerson16Regular" :label="step.createdBy ?? '-'"
                                :size="16" />
                        </div>
                    </div>
                </n-card>
            </div>
        </n-scrollbar>


=======

                <!-- Skeleton Loading State -->
                <template v-if="props.isLoading">
                    <n-card v-for="i in 6" :key="`skeleton-${i}`"
                        class="!w-[280px] !min-w-[280px] !border !border-gray-200">
                        <div class="flex flex-col gap-3">
                            <n-skeleton text style="width: 70%" />
                            <n-skeleton text style="width: 30%" :sharp="false" />
                            <div class="flex flex-col gap-2 mt-2">
                                <n-skeleton text style="width: 50%" />
                                <n-skeleton text style="width: 40%" />
                            </div>
                        </div>
                    </n-card>
                </template>

                <!-- Actual Cards -->
                <template v-else>
                    <n-card v-for="step in props.workflow" :key="step.stepOrder"
                        :ref="(el: any) => setStepRef(el, step.stepOrder)" :class="[
                            '!w-[280px] !min-w-[280px] transition-all duration-300',
                            isCurrentStep(step.stepOrder)
                                ? '!border-2 !border-orange-400 !shadow-lg'
                                : '!border !border-gray-200'
                        ]">
                        <div class="flex flex-col gap-2">
                            <p :class="resolveStatus(step).titleClass">{{ step.workflowName }}</p>

                            <div class="flex">
                                <div :class="['text-xs rounded', resolveStatus(step).class]">
                                    {{ resolveStatus(step).title }}
                                </div>
                            </div>

                            <div class="flex flex-col gap-1 text-gray-500">
                                <BaseIconWithLabel :icon="CalendarRtl12Regular" :label="step.createdAt ?? '-'"
                                    :size="14" />
                                <BaseIconWithLabel :icon="FolderPerson16Regular" :label="step.createdBy ?? '-'"
                                    :size="16" />
                            </div>
                        </div>
                    </n-card>
                </template>

            </div>
        </n-scrollbar>

>>>>>>> feat/tracking-replacement-request
    </div>
</template>


<script setup lang="ts">
import BaseIconWithLabel from '@/components/BaseIconWithLabel.vue';
import type { ReplacementHistoriesWorkflow } from '@/modules/Replacement/schemas/replacement.api.schema';
import { CalendarRtl12Regular, FolderPerson16Regular } from '@vicons/fluent';
import type { ScrollbarInst } from 'naive-ui';
import { nextTick, ref, watch } from 'vue';

interface Props {
    workflow: ReplacementHistoriesWorkflow[],
    currentStep: number,
    isLoading: boolean,
    statusTicket?: string
}

const props = withDefaults(defineProps<Props>(), {
    isLoading: true,
    statusTicket: 'In Progress'
})

// ========== Naive UI Scrollbar Ref ==========
const scrollbarRef = ref<ScrollbarInst | null>(null);
const stepRefs = new Map<number, HTMLElement>();

// Card width + gap (280px + 12px gap)
const CARD_WIDTH = 280;
const GAP = 12;

const setStepRef = (el: any, stepOrder: number) => {
    if (el?.$el) {
        stepRefs.set(stepOrder, el.$el);
    }
};

const isCurrentStep = (stepOrder: number) => {
    return stepOrder === props.currentStep;
};

/**
 * Scroll to current step using Naive UI scrollbar API
 */
const scrollToCurrentStep = () => {
    nextTick(() => {
        if (!scrollbarRef.value) return;

        // Calculate scroll position: (currentStep - 1) * (cardWidth + gap)
        // Subtract half container width to center the card
        const stepIndex = props.currentStep - 1;
        const scrollLeft = Math.max(0, stepIndex * (CARD_WIDTH + GAP) - 100);

        scrollbarRef.value.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
        });
    });
};

// Watch for workflow changes and scroll to current step
watch(
    () => props.workflow,
    (newWorkflow) => {
        if (newWorkflow.length > 0) {
            // Small delay to ensure DOM is updated
            setTimeout(scrollToCurrentStep, 150);
        }
    },
    { immediate: true }
);

// Also watch currentStep changes
watch(
    () => props.currentStep,
    () => {
        scrollToCurrentStep();
    }
);

// ========== Status resolver ==========
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
    if (data.stepOrder === props.currentStep && props.statusTicket === 'In Progress') {
        return {
            type: 'warning',
            title: 'Progress',
            class: 'inline-flex px-2 py-0.5 items-center bg-yellow-100',
            done: false,
            titleClass: 'font-semibold text-orange-400',
            roleClass: 'text-sm text-orange-400'

        }
    }

    if (data.stepOrder === props.currentStep && props.statusTicket === 'Rejected') {
        return {
            type: 'error',
            title: 'Rejected',
            class: 'inline-flex px-2 py-0.5 items-center bg-red-100',
            done: false,
            titleClass: 'font-semibold text-red-400',
            roleClass: 'text-sm text-red-400'

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
