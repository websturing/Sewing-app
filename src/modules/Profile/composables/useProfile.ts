import { useAuthStore } from "@/stores/auth"
import { storeToRefs } from "pinia"

export function useProfile() {
    const auth = useAuthStore()

    const { user, role, permissions } = storeToRefs(auth)
    const email = user.value?.email
    const name = user.value?.name


    return {
        email,
        name,
        role,
        permissions
    }

}