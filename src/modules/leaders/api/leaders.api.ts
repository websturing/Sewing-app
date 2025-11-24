import api from '@/lib/api';
import type { AssignLeaderForm } from '@/modules/leaders/schemas/leaders.form.schema';
import type { UnassignLeaderRequest } from '@/modules/leaders/schemas/leaders.request.schema';

const apiPrefix = import.meta.env.VITE_API_PREFIX || ''

export const leadersApi = {
    getAssignments: () =>
        api.get(`${apiPrefix}/leaders`).then(r => r.data),
    createAssign: (payload: AssignLeaderForm) =>
        api.post(`${apiPrefix}/leaders/assign`, payload).then(r => r.data),
    createUnassign: (payload: UnassignLeaderRequest) =>
        api.post(`${apiPrefix}/leaders/unassign`, payload).then(r => r.data),
}