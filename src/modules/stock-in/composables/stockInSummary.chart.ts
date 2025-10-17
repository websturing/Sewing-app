import type { StockInSummaryLinesChartRequest } from '@/modules/stock-in/schemas/stockInSummary.api.schema';
import { useStockInSummary } from '@/modules/stock-in/stores/stockInSummary.store';
import { useMessage } from "naive-ui";
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

type OptionNotify = {
    notify?: boolean  // default: false
}

export function useStockInSummaryChart() {

    const store = useStockInSummary();
    const toast = useMessage()

    const { chartLines, topThreeByPcsNonZero, totalStockInPcs, stockInTotal, linePerformance, loading } = storeToRefs(store);
    const optionsEchart = ref({});

    const labels = computed(() => chartLines.value.map(item => item.name))
    const pcsData = computed(() => chartLines.value.map(item => item.stockinCount.pcs))
    const bundleData = computed(() => chartLines.value.map(item => item.stockinCount.bundle))

    optionsEchart.value = {
        title: { text: 'Stock-In Area Chart' },
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
            {
                name: 'Bundle',
                type: 'line',
                smooth: true,
                data: bundleData,
                areaStyle: {
                    opacity: 0.5,
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            { offset: 0, color: '#22c55e' },
                            { offset: 1, color: 'rgba(34,197,94,0)' }
                        ]
                    }
                },
                itemStyle: { color: '#22c55e' },
                lineStyle: { width: 3 }
            }
        ]
    }


    const handleFetchChartLines = async (
        payload: StockInSummaryLinesChartRequest,
        options: OptionNotify = { notify: true }
    ) => {
        const { success, message } = await store.fetchChartLines(payload);
        if (options.notify) {
            success ? toast.success(message) : toast.error(message)
        }

    }

    return {
        loading,
        linePerformance,
        stockInTotal,
        totalStockInPcs,
        topThreeByPcsNonZero,
        optionsEchart,
        chartLines,
        handleFetchChartLines,
    }
}