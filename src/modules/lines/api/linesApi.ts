import api from '@/lib/api';
import type { LineFilterRequest } from '@/modules/lines/schemas/line.request.schema';
import qs from 'qs';

const apiPrefix = import.meta.env.VITE_API_PREFIX || ''

export const linesApi = {
    getlines: (params: LineFilterRequest) =>
        api.get(`${apiPrefix}/lines`, {
            params: params,
            paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' })
        }).then(r => r.data),

}