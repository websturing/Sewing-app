// utils/toast.ts
import { useNotification } from "naive-ui"



const push = useNotification()

export const showSuccess = (message: string) => {
    push.success({
        meta: message,
        duration: 5000,
    })
}

export const showError = (message: string) => {
    push.error({
        meta: message,
        duration: 5000,
    })
}

export const showInfo = (message: string) => {
    push.info({
        content: message,
        duration: 5000,
    })
}

export const showWarning = (message: string) => {
    push.warning({
        content: message,
        duration: 5000,
    })
}

// utils/notify.ts



export function handleApiResponse(response: any) {
    if (response?.status == true) {
        push.success({
            content: response.message || 'Operation succeeded',
        })
    } else {
        push.error({
            content: response.message || 'Something went wrong',
        })
    }
}