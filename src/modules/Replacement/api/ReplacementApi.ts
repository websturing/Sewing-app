import api from '@/lib/api';

const apiPrefix = import.meta.env.VITE_API_PREFIX || ''

export const replacementApi = {
    createTicketReplacement: (payload: any) =>
        api.post(`${apiPrefix}/replacement-request`, {
            data: payload
        }).then(r => r.data),

}