import api from '@/lib/api';
import { type StockInSummaryLinesChartRequest } from '@/modules/stock-in/schemas/stockInSummary.api.schema';
import qs from 'qs';


export const stockInApi = {
    getChartLines: (params: StockInSummaryLinesChartRequest) =>
        api.get("/api/stock-ins/summaries/chart/stock-ins/chart", {
            params: params,
            paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' })
        }).then(r => r.data),
}