import type { StockInSummaryLinesChartRequest } from '@/modules/stock-in/schemas/stockInSummary.api.schema';
import { useStockInSummary } from '@/modules/stock-in/stores/stockInSummary.store';

export function useStockInSummaryChart() {

    const store = useStockInSummary();

    const handleFetchChartLines = (payload: StockInSummaryLinesChartRequest) => {
        return store.fetchChartLines(payload);
    }

    return {
        handleFetchChartLines,
    }
}