import api from '@/lib/api';
import { type GroupByGlNumberQuery, type StockInSummaryLinesChartRequest } from '@/modules/stock-in/schemas/stockInSummary.api.schema';
import qs from 'qs';

const apiPrefix = import.meta.env.VITE_API_PREFIX || ''

export const stockInApi = {
    getChartLines: (params: StockInSummaryLinesChartRequest) =>
        api.get(`${apiPrefix}/stock-ins/summaries/chart/stock-ins/chart`, {
            params: params,
            paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' })
        }).then(r => r.data),

    getGroupByGlNumber: (params: GroupByGlNumberQuery) =>
        api.get(`${apiPrefix}/stock-ins/summaries/group-glnumber`, {
            params: params,
            paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' })
        }).then(r => r.data),
}