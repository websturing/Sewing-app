import { useGLTable } from "@/modules/gls/composables/gls.table"

export function useGLPage() {

    const { handleFetch, data, loading, search } = useGLTable()


    return {
        data,
        search,
        loading,
        handleFetch
    }
}