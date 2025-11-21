import api from '@/lib/api';
import type { AssignLeaderRequest } from '@/modules/leaders/schemas/leaders.request.schema';

const apiPrefix = import.meta.env.VITE_API_PREFIX || ''

export const leadersApi = {
    getAssignments: () =>
        api.get(`${apiPrefix}/leaders`).then(r => r.data),
    createAssign: (payload: AssignLeaderRequest) =>
        api.post(`${apiPrefix}/leaders/assign`, payload).then(r => r.data),
    createUnassign: (payload: AssignLeaderRequest) =>
        api.post(`${apiPrefix}/leaders/unassign`, payload).then(r => r.data),
}