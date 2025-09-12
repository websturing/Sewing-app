<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import InputLabelWithError from '@/components/InputLabelWithError.vue';
import ProgressModal from '@/components/ProgressModal.vue';
import SelectLabelWithError from '@/components/SelectLabelWithError.vue';
import { useAssignmentLinesForm } from '@/modules/assignment-lines/composables/assignmentLine.form';
import { useAssignmentLinesStore } from '@/modules/assignment-lines/stores/AssignmentLines.store';
import GlsLayingPlanning from '@/modules/gls/components/GlsLayingPlanning.vue';
import GlsSummary from '@/modules/gls/components/GlsSummary.vue';
import { useGlSummary } from '@/modules/gls/composables/gls.summary';
import { useGlView } from '@/modules/gls/composables/gls.view';
import { type LayingPlanning } from '@/modules/gls/schemas/gls.api.schema';
import { useLineView } from '@/modules/lines/composables/line.view';
import { SaveAnnotation } from '@vicons/carbon';
import { Search20Filled } from '@vicons/fluent';
import { SearchOffRound } from '@vicons/material';
import { useDialog } from 'naive-ui';
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const dialog = useDialog()
const { options: lineOptions, handleFetch: fetchLines, handleUpdateSearch: handleSearchLines } = useLineView()
const { options: glOptions, handleFetch: fetchGls, handleUpdateSearch: handleSearchGls, handleFetchSummaryGLNumber } = useGlView()
const { summaryGl, metaSummary, loading: isLoadingSummary } = useGlSummary()

/** FORM STATE */
const { glNumber, lineId: line, layingPlanning, errors, dateRangeUnformated, isLoading, onSubmit } = useAssignmentLinesForm()
const store = useAssignmentLinesStore()

const selectedLayingPlanning = ref<LayingPlanning | null>(null)
const searchLayingPlanning = ref('')

const handleSelectedLayingPlanning = (value: LayingPlanning) => {
    selectedLayingPlanning.value = value
    layingPlanning.value = {
        id: value.id,
        color: value.color,
        type: value.type as "BODY" | "COMBINASI", // cast enum
        summary: value.summary,
    }
}

const handleSubmit = onSubmit(async (values) => {
    dialog.success({
        title: 'Confirmation Create Line Assignment',
        content: 'Are you sure you want to create this record? Please review the details before proceeding.',
        positiveText: 'Create',
        negativeText: 'Cancel',
        draggable: true,
        onPositiveClick: async () => {
            await store.create(values)
        },
    })
})

const handleFetchGLNumber = (value: any) => {
    selectedLayingPlanning.value = null
    layingPlanning.value = {
        id: undefined,
        color: "",
        type: "BODY", // atau "COMBINASI"
        summary: {
            orderQty: 0,
            cutQty: 0,
        },
    }

    handleFetchSummaryGLNumber(value)
}


const filteredSummaryGl = computed(() => {
    if (!searchLayingPlanning.value) return summaryGl.value

    return summaryGl.value.map(gl => ({
        ...gl,
        layingPlannings: gl.layingPlannings.filter(lp =>
            lp.color.toLowerCase().includes(searchLayingPlanning.value.toLowerCase()) ||
            lp.type.toLowerCase().includes(searchLayingPlanning.value.toLowerCase())
        )
    }))
})

onMounted(async () => {
    await fetchLines({ notify: false })
    await fetchGls({ notify: false })
})
const showProgressModal = ref(false);

watch(() => store.loading, (val) => {
    if (val) {
        showProgressModal.value = true;
    } else {
        setTimeout(() => {
            showProgressModal.value = false;
            router.push({ name: 'assignment-lines' });
        }, 500); // kasih waktu transisi
    }
});

</script>

<template>
    <div class="flex flex-col gap-5">
        <form @submit.prevent="handleSubmit">
            <n-spin size="medium" class="mt-6" description="Please Wait, Loading your selected data"
                :show="isLoadingSummary">
                <div class="flex flex-wrap gap-4 mb-4 items-center justify-between">
                    <div class="flex items-start gap-4">
                        <ul class="space-y-2">
                            <!-- Parent -->
                            <li>
                                <SelectLabelWithError v-model="glNumber" name="glNumber" :options="glOptions"
                                    :errors="errors" :multiple="false" @change="handleFetchGLNumber"
                                    @search="handleSearchGls" label="GL Number" />

                                <!-- Children -->
                                <ul class="ml-4 mt-2 border-l border-gray-300" v-if="summaryGl.length > 0">
                                    <li class="relative pl-6 flex items-center gap-2">
                                        <!-- garis horizontal -->
                                        <span class="absolute left-0 top-1/2 w-6 border-t border-gray-300"></span>
                                        <InputLabelWithError v-model="searchLayingPlanning" name="searchLayingPlanning"
                                            placeholder="Search by Color or Type" style="width: 250px"
                                            :icon="Search20Filled" />
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <SelectLabelWithError v-model="line" name="lineId" :options="lineOptions" :multiple="false"
                            :errors="errors" label="Line Name" @search="handleSearchLines" />
                        <div>
                            <label for="dateRange" class="font-bold">Start - End Date</label>
                            <n-date-picker id="dateRange" :status="errors.dateRange ? 'error' : ''"
                                v-model:value="dateRangeUnformated" type="daterange" clearable />
                        </div>
                        <BaseButton label="Save Assignments" type="success" class-content="!mt-6" :icon="SaveAnnotation"
                            icon-placement="right" attr-type="submit" />
                    </div>
                    <div v-if="errors.layingPlanning" class="w-1/6">
                        <n-alert type="error">
                            Please select a color from the list.
                        </n-alert>
                    </div>
                </div>
            </n-spin>
            <n-empty v-if="filteredSummaryGl.length === 0" description="GL Number Not Selected" class="mt-10" />
            <div v-else v-for="(gl, gIndex) in filteredSummaryGl">
                <GlsSummary :summary="gl" :row-index="gIndex + 1" :last-updated="metaSummary.lastUpdated">

                    <n-empty v-if="gl.layingPlannings.length === 0"
                        :description="`No results found for ${searchLayingPlanning}`">
                        <template #icon>
                            <SearchOffRound class="!text-6xl !text-gray-300" />
                        </template>
                    </n-empty>

                    <div class="flex flex-wrap gap-2 mt-4">
                        <GlsLayingPlanning v-for="(item, index) in gl.layingPlannings" :key="index"
                            :laying-planning="item" :bg-color="selectedLayingPlanning == item ? 'bg-teal-50' : ''"
                            :row-index="index + 1" @click="handleSelectedLayingPlanning" />
                    </div>
                </GlsSummary>

            </div>
        </form>

        <ProgressModal v-model:show="showProgressModal" title="Processing Assignment Lines"
            description="Please wait while we process your request." :error="false" />
    </div>
</template>

<style scoped>
.summary-table {
    border-radius: 4px;
    width: 100%;
}

.summary-table th,
td {
    padding: 8px;
    text-align: left;
}

.summary-table tr:last-child td {
    border-bottom: none;
}
</style>