<template>
    <div class="bg-gray-50 rounded-lg p-5">
        <div class="flex flex-col gap-3">
            <div class="flex">
                <p class="w-[120px] font-semibold">GL Number</p>
                <n-select v-model:value="glNumber" :options="glNumberOptions" filterable
                    @update:value="handleSelectedGLNumber" class="!w-[220px]" />
            </div>
            <div class="flex">
                <p class="w-[120px] font-semibold">Color</p>
                <n-select v-model:value="color" :options="colorOptions" class="!w-[420px]" />
            </div>
            <div class="flex">
                <p class="w-[120px] font-semibold">Range Date</p>
                <div class="flex gap-2 items-center h-[30px]">
                    <n-switch v-model:value="isDateRange">
                        <template #checked>
                            All Dates
                        </template>
                        <template #unchecked>
                            Custom Dates
                        </template>
                    </n-switch>
                    <n-select v-if="!isDateRange" v-model:value="glNumber" :options="glNumberList" class="!w-[420px]" />
                </div>

            </div>
            <BaseButton label="Generate Completion Report" :icon="BorderLeft24Filled" type="primary"
                @click="handleReport" />
        </div>
    </div>
</template>
<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import type { GlListItem } from '@/modules/gls/schemas/gls.api.schema';
import { useReportCompletionPage } from '@/modules/report-completion/composables/reportCompletion.page';
import { GLCompletionReportRequestSchema } from "@module/gls/schemas/gls.request.schema";
import { BorderLeft24Filled } from '@vicons/fluent';
import { computed, onMounted, ref } from "vue";


const glNumber = ref<string | null>(null)
const color = ref<string | null>(null)
const isDateRange = ref<boolean>(true)
const glNumberList = ref<GlListItem[]>([])
const colorList = ref<string[]>([])
const colorOptions = ref<Array<{ label: string, value: string }>>([]);

const { handleGLList } = useReportCompletionPage()
const glNumberOptions = computed(() => {
    return glNumberList.value.map(item => ({
        label: item.glNumber,
        value: item.glNumber
    }))
})


const handleSelectedGLNumber = (val: string) => {
    color.value = 'all'
    const selectedGL = glNumberList.value.find((e) => e.glNumber === val);
    if (!selectedGL || !selectedGL.colors) {
        colorList.value = [];
        return;
    }

    // Simpan array colors asli
    colorList.value = selectedGL.colors;

    // Jika butuh options untuk select
    colorOptions.value = [
        { label: "All", value: "all" },
        ...selectedGL.colors.map(color => ({ label: color, value: color }))
    ];
}

const handleReport = () => {
    openReport({
        glNumber: glNumber.value,
        color: color.value
    })
}


const openReport = (formData: any) => {
    console.log(formData)
    // 1. Validasi
    const parsed = GLCompletionReportRequestSchema.safeParse(formData)
    if (!parsed.success) {
        console.error(parsed.error)
        return
    }

    const data = parsed.data

    // 2. Build query string
    const query = new URLSearchParams({
        glNumber: data.glNumber,
        color: data.color,
        startDate: data.startDate ?? '',
        endDate: data.endDate ?? ''
    })

    // 3. Build final URL (misal endpoint-nya /report/completion)
    const url = import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_API_PREFIX + `/pdf/completion-report?${query.toString()}`

    // 4. Open in new tab
    window.open(url, '_blank')
}


onMounted(async () => {
    const response = await handleGLList({ notify: true })
    if (response.success && response.data) {
        glNumberList.value = response.data as GlListItem[]
    }
})


</script>