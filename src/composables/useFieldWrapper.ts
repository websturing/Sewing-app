import { useField } from "vee-validate"
import type { Ref } from "vue"

export function useFields<T extends Record<string, any>>(fields: (keyof T)[]) {
    const result: Record<string, Ref<any>> = {}

    for (const field of fields) {
        const { value } = useField<any>(field as string)
        result[field as string] = value
    }

    return result as { [K in keyof T]: Ref<T[K]> }
}
