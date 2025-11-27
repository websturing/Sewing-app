<template>
    <div class="flex flex-col gap-10">
        <div class="flex justify-between items-center">
            <div class="w-84 flex-auto">
                <h2 class="text-xl font-bold mb-1">{{ meta.title }}</h2>
                <p>{{ meta.description }}</p>
            </div>
            <div class="w-16 flex-auto text-right">
                <n-breadcrumb>
                    <n-breadcrumb-item><n-icon :component="SmartHome" /> Home</n-breadcrumb-item>
                    <n-breadcrumb-item>
                        <n-icon :component="Forms" />
                        Replacement Form
                    </n-breadcrumb-item>
                </n-breadcrumb>
            </div>
        </div>

        <div>
            <BaseSelectWithError name="glNumber" :options="optionGlnumbers" label="GL Numbers" v-model="glNumber"
                placeholder="Select GL Number" />
        </div>
        <div class="flex flex-col gap-5 border border-gray-200 rounded-lg p-5" v-if="defectDetail">
            <div>
                <p class="mb-2 text-gray-400">GL Number Detail</p>
                <table class="!text-md">
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
                </table>
            </div>
            <n-divider />
            <p class="text-gray-400">Request Form Replacement Detail</p>
            <div>
                <n-tabs v-model:value="activeTab" type="card" animated pane-class="!bg-blue-50 rounded-lg !p-3">
                    <n-tab-pane v-for="e in defectDetail?.items" :name="e.color" :tab="e.color">
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
                                            <n-input-number min="0" class="!w-[110px]" v-model:value="s.totalDefect"
                                                @keydown="handleKeydown" button-placement="both" />
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
                                <tr>
                                    <td>Grand Total Defect</td>
                                    <td>&nbsp; : &nbsp;</td>
                                    <td>{{ grandTotal }}</td>
                                </tr>
                            </table>
                        </div>
                    </n-tab-pane>
                </n-tabs>
            </div>
            <div class="flex justify-end">
                <BaseButton label="Save Changes" type="primary" :icon="SaveAnnotation" />
            </div>
        </div>

    </div>
</template>
<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import { useReplacementForm } from '@/modules/Replacement/composables/replacement.form';
import { SaveAnnotation } from '@vicons/carbon';
import { Forms, SmartHome } from '@vicons/tabler';
import { computed, onMounted, ref, watch } from "vue";

const glNumber = ref<string | null>(null)
const activeTab = ref<string | null>('')
const tabColor = ref<string | null>('!bg-gray-200')
const {
    meta,
    optionGlnumbers,
    defectColorSizeDetail: defectDetail,
    handleFetchGlNumberDefect,
    handleFilterDefectGlNumber
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



watch(glNumber, (newValue) => {
    handleFilterDefectGlNumber(newValue);
    activeTab.value = defectDetail.value?.items[0]?.color ?? '';
});

watch(activeTab, (newValue) => {
    tabColor.value = newValue;
});



const handleKeydown = (e: any) => {
    // Mencegah backspace (key code 8)
    if (e.keyCode === 8 || e.key === 'Backspace') {
        e.preventDefault()
        return false
    }
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