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
                <n-select v-model:value="color" :options="colorOptions" class="!w-[420px]" :disabled="!glNumber" />
            </div>

            <div class="flex">
                <p class="w-[120px] font-semibold">Range Date</p>
                <div class="flex gap-2 items-center h-[30px]">
                    <n-switch v-model:value="isDateRange" :rail-style="railStyle">
                        <template #checked>All Dates</template>
                        <template #unchecked>Custom Dates</template>
                    </n-switch>

                    <n-date-picker v-if="!isDateRange" v-model:value="range" type="daterange" clearable />
                </div>
            </div>

            <BaseButton label="Generate Completion Report" :icon="BorderLeft24Filled" type="primary"
                :disabled="!glNumber || !color" @click="handleReport" />
        </div>
    </div>
</template>
<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import type { GlListItem } from '@/modules/gls/schemas/gls.api.schema';
import { useReportCompletionPage } from '@/modules/report-completion/composables/reportCompletion.page';
import { GLCompletionReportRequestSchema } from "@module/gls/schemas/gls.request.schema";
import { BorderLeft24Filled } from '@vicons/fluent';
import type { CSSProperties } from 'vue';
import { computed, onMounted, ref } from "vue";

/* ------------------ STATE ------------------ */

const glNumber = ref<string | null>(null)
const color = ref<string | null>(null)

const isDateRange = ref<boolean>(true)
// timestamp array
const range = ref<[number, number]>([
    1183135260000,
    Date.now()
])

const glNumberList = ref<GlListItem[]>([])
const colorList = ref<string[]>([])

const colorOptions = ref<Array<{ label: string, value: string }>>([])

const { handleGLList } = useReportCompletionPage()

/* ------------------ COMPUTED OPTIONS ------------------ */

const glNumberOptions = computed(() => {
    return glNumberList.value.map(item => ({
        label: item.glNumber,
        value: item.glNumber
    }))
})

/* ------------------ EVENT HANDLERS ------------------ */

const handleSelectedGLNumber = (val: string) => {
    color.value = 'all'

    const selectedGL = glNumberList.value.find((e) => e.glNumber === val);
    if (!selectedGL || !selectedGL.colors) {
        colorList.value = [];
        return;
    }

    colorList.value = selectedGL.colors;

    colorOptions.value = [
        { label: "All", value: "all" },
        ...selectedGL.colors.map(c => ({ label: c, value: c }))
    ]
}

const handleReport = () => {
    const payload: any = {
        glNumber: glNumber.value,
        color: color.value
    }

    // hanya kirim tanggal kalau isDateRange ON
    if (!isDateRange.value && range.value?.length === 2) {
        const start = new Date(range.value[0]).toISOString().split("T")[0]
        const end = new Date(range.value[1]).toISOString().split("T")[0]

        payload.startDate = start
        payload.endDate = end
    }

    openReport(payload)
}

function railStyle({
    focused,
    checked
}: {
    focused: boolean
    checked: boolean
}) {
    const style: CSSProperties = {}
    if (checked) {
        style.background = '#d03050'
        if (focused) {
            style.boxShadow = '0 0 0 2px #d0305040'
        }
    }
    else {
        style.background = '#2080f0'
        if (focused) {
            style.boxShadow = '0 0 0 2px #2080f040'
        }
    }
    return style
}

/* ------------------ REPORT GENERATOR ------------------ */

const openReport = (formData: any) => {
    const parsed = GLCompletionReportRequestSchema.safeParse(formData)
    if (!parsed.success) {
        console.error(parsed.error)
        return
    }

    const data = parsed.data

    const queryObj: Record<string, string> = {
        gl_number: data.glNumber,  // snake_case untuk URL
        color: data.color
    }

    if (!isDateRange.value) {
        if (data.startDate) queryObj.start_date = data.startDate  // snake_case untuk URL
        if (data.endDate) queryObj.end_date = data.endDate  // snake_case untuk URL
    }

    const query = new URLSearchParams(queryObj)

    const url =
        import.meta.env.VITE_API_BASE_URL +
        import.meta.env.VITE_API_PREFIX +
        `/pdf/completion-report?${query.toString()}`

    window.open(url, '_blank')
}

/* ------------------ INIT ------------------ */

onMounted(async () => {
    const response = await handleGLList({ notify: true })
    if (response.success && response.data) {
        glNumberList.value = response.data as GlListItem[]
    }
})
</script>
