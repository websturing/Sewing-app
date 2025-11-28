import api from '@/lib/api';
import type { ReplacementPaginationRequest } from '@/modules/Replacement/schemas/replacement.request.schema';
import qs from 'qs';

const apiPrefix = import.meta.env.VITE_API_PREFIX || ''

export const replacementApi = {
    createTicketReplacement: (payload: any) =>
        api.post(`${apiPrefix}/replacement-request`, {
            data: payload
        }).then(r => r.data),
    getReplacementListPagination: (params: ReplacementPaginationRequest) =>
        api.get(`${apiPrefix}/replacement-request/pagination`, {
            params: params,
            paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' })
        }).then(r => r.data),

}