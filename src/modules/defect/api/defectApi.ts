import api from '@/lib/api';

const apiPrefix = import.meta.env.VITE_API_PREFIX || ''

export const defectApi = {
    getSummaryGroupLines: () =>
        api.get(`${apiPrefix}/defect/summary/lines`).then(r => r.data),

}