import api from '@/lib/api';
import type { GLMatrixRequest } from '@/modules/gls/schemas/gls.request.schema';
import qs from 'qs';

const apiPrefix = import.meta.env.VITE_API_PREFIX || ''

export const glsApi = {
    getMatrix: (params: GLMatrixRequest) =>
        api.get(`${apiPrefix}/gls/matrix-date`, {
            params: params,
            paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' })
        }).then(r => r.data),

}