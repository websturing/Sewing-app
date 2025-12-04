<template>
    <div class="flex flex-col gap-10">

        <div class="flex flex-col gap-2">
            <BaseSelectWithError name="glNumber" :options="optionGlnumbers" label="GL Numbers" v-model="glNumber"
                placeholder="Select GL Number" classContent="!w-[300px]" />
            <div>
                <label class="font-semibold">Note</label>
                <n-input v-model:value="note" type="textarea" placeholder="Basic Textarea" />
            </div>
        </div>

        <div class="mt-2 p-10 bg-gray-50 border border-gray-200 rounded-lg" v-if="!defectDetail">
            <n-empty description="GL Number not selected" size="huge">
            </n-empty>
        </div>
        <div class="flex flex-col gap-5 border border-gray-200 rounded-lg p-5" v-if="defectDetail">
            <div>
                <p class="mb-2 text-gray-400">GL Number Detail</p>
                <table class="!text-md">
                    <tbody>
                        <tr>
                            <td>GL Number</td>
                            <td>&nbsp; : &nbsp;</td>
                            <td class="!font-bold">{{ defectDetail.glNumber }}</td>
                        </tr>
                        <tr>
                            <td>Color</td>
                            <td>&nbsp; : &nbsp;</td>
                            <td class="!font-bold">
                                {{ defectDetail.color }}
                                ({{ defectDetail.items.length }} Color)</td>
                        </tr>
                        <tr>
                            <td>Total Defect</td>
                            <td>&nbsp; : &nbsp;</td>
                            <td class="!font-bold !text-red-400">
                                {{ defectDetail.totalDefect }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <n-divider />
            <p class="text-gray-400">Request Form Replacement Detail</p>
            <div>
                <n-tabs v-model:value="activeTab" type="card" animated pane-class="!bg-blue-50 rounded-lg !p-3">
                    <n-tab-pane v-for="e in defectDetail?.items.filter((e: any) => e.totalDefect > 0)" :name="e.color"
                        :tab="e.color">
                        <n-table class="!shadow-sm" :single-line="false">
                            <thead>
                                <tr>
                                    <th class="!bg-white">Color</th>
                                    <th :colspan="(e.items.length ?? 0) + 1"
                                        class=" !text-center !bg-white !text-blue-600 !font-semibold">
                                        {{ e.color }}
                                    </th>
                                </tr>
                                <tr>
                                    <th class="!bg-white">Size</th>
                                    <th v-for="s in e.items" class="!text-center !bg-white">{{ s.size }}
                                    </th>
                                    <th class="!bg-white !text-center ">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Defect</td>
                                    <td v-for="s in e.items" class="!text-center">
                                        <div class="flex justify-center">
                                            <n-input-number min="0" :max="s.maxDefect" class="!w-[110px]"
                                                v-model:value="s.totalDefect" @keydown="handleKeydown"
                                                button-placement="both" />
                                        </div>
                                    </td>
                                    <td class="!text-center !font-bold !text-red-400">
                                        {{e.items.reduce((sum: any, s: any) => sum + (s.totalDefect ?? 0), 0)}}
                                    </td>
                                </tr>
                            </tbody>
                        </n-table>
                        <div class="mt-3">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Grand Total Defect</td>
                                        <td>&nbsp; : &nbsp;</td>
                                        <td>{{ grandTotal }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </n-tab-pane>
                </n-tabs>
            </div>
            <div class="flex justify-end">
                <BaseButton label="Save Changes" type="primary" @click="handleSaveChanges" :icon="SaveAnnotation"
                    :loading="isLoading" />
            </div>
        </div>

    </div>
</template>
<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import type { summaryGLDataApiResponse } from '@/modules/gls/schemas/gls.api.schema';
import { useGlStore } from '@/modules/gls/stores/gls.store';
import { useReplacementForm } from '@/modules/Replacement/composables/replacement.form';
import { SaveAnnotation } from '@vicons/carbon';
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from 'vue-router';


const isLoading = ref<boolean>(false)
const glNumber = ref<string | null>(null)
const note = ref<string | null>(" ")
const glSummary = ref<any>([])
const activeTab = ref<string | null>('')
const defectList = ref<any>([]);
const router = useRouter();
const {
    optionGlnumbers,
    defectColorSizeDetail: defectDetail,
    handleFetchGlNumberDefect,
    handleFilterDefectGlNumber,
    handleCreateReplacement
} = useReplacementForm()

const grandTotal = computed(() =>
    defectDetail.value?.items.reduce(
        (acc: number, item: any) =>
            acc +
            item.items.reduce(
                (sum: number, s: any) => sum + (s.totalDefect ?? 0),
                0
            ),
        0
    ) ?? 0
)


watch(glNumber, async (newValue) => {
    handleFilterDefectGlNumber(newValue);
    activeTab.value = defectDetail.value?.items.find((e: any) => e.totalDefect > 0)?.color ?? '';
    if (newValue) {
        const { data } = await useGlStore().fetchSummaryGl(newValue) as { data: summaryGLDataApiResponse }
        glSummary.value = data.summaryByGl[0].layingPlannings
    }
});



const handleKeydown = (e: any) => {
    // Mencegah backspace (key code 8)
    if (e.keyCode === 8 || e.key === 'Backspace') {
        e.preventDefault()
        return false
    }
}

const handleSaveChanges = async () => {
    const defects = defectDetail.value?.items.map((e: any) => {
        const sizes = e.items.filter((f: any) => {
            return f.totalDefect > 0
        })

        return sizes
    }).filter((a: any) => a.length > 0)                                      // buang kosong
        .flat();

    const merged = defects.map((d: any) => {
        const match = glSummary.value.find((g: any) => g.color === d.color)

        return {
            ...d,
            layingPlanningId: match?.id ?? null,
        }
    })

    defectList.value = {
        defectList: merged,
        note: note.value
    }
    isLoading.value = true
    await handleCreateReplacement(defectList.value);
    isLoading.value = false
    router.push({ name: 'replacement' })

}

onMounted(() => {
    handleFetchGlNumberDefect()
})
</script>
<style lang="css" scooped>
.n-tabs .n-tabs-nav.n-tabs-nav--card-type .n-tabs-tab.n-tabs-tab--active {
    background-color: #eff6ff !important;
    font-weight: var(--n-tab-font-weight-active);
    color: var(--n-tab-text-color-active);
}
</style>