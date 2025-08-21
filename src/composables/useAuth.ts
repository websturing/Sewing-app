import { useAuthStore } from "@/stores/auth"
import { storeToRefs } from "pinia"

export function useAuth() {
    const auth = useAuthStore()

    const { user } = storeToRefs(auth)
    const email = user.value?.email
    const name = user.value?.name


    return {
        email,
        name
    }

}