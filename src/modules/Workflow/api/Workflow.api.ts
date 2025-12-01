import api from '@/lib/api';

const apiPrefix = import.meta.env.VITE_API_PREFIX || ''

export const workflowsApi = {
    getWorkflowById: (id: number) =>
        api.get(`${apiPrefix}/workflows/${id}`,).then(r => r.data),

}