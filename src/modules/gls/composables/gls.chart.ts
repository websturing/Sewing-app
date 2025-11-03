import type { GLMatrixRequest } from '@/modules/gls/schemas/gls.request.schema';
import { useGlStore } from '@/modules/gls/stores/gls.store';
import { useMessage } from "naive-ui";
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

type OptionNotify = {
    notify?: boolean  // default: false
}

export function useGLChart() {

    const store = useGlStore();
    const toast = useMessage()
    const { matrixData, matrixSummary } = storeToRefs(store)

    const GLNumberOptionsEchart = ref({});
    const labels = computed(() => matrixData.value.map(item => item.date))
    const pcsData = computed(() => matrixData.value.map(item => item.totalPcs))

    GLNumberOptionsEchart.value = {
        title: { text: 'Cut Pieces Flow' },
        tooltip: { trigger: 'axis' },
        legend: { data: ['PCS', 'Bundle'] },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: {
            type: 'category',
            boundaryGap: false, // biar area chart nempel ke kiri-kanan
            data: labels,
        },
        yAxis: { type: 'value' },
        series: [
            {
                name: 'PCS',
                type: 'line',
                smooth: true,
                data: pcsData,
                areaStyle: {
                    opacity: 0.6,
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            { offset: 0, color: '#6366f1' }, // atas
                            { offset: 1, color: 'rgba(99,102,241,0)' } // bawah transparan
                        ]
                    }
                },
                itemStyle: { color: '#4f46e5' },
                lineStyle: { width: 3 }
            },
        ]
    }



    const handleFetchGLMatrix = async (
        payload: GLMatrixRequest,
        options: OptionNotify = { notify: true }
    ) => {
        const { success, message } = await store.fetchGLMatix(payload);
        if (options.notify) {
            success ? toast.success(message) : toast.error(message)
        }

    }

    return {
        matrixData,
        GLNumberOptionsEchart,
        handleFetchGLMatrix,
    }
}