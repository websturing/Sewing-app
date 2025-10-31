import { useGLTable } from "@/modules/gls/composables/gls.table"
import { useGlStore } from "@/modules/gls/stores/gls.store"
import { useGlTableStore } from '@/modules/gls/stores/glsTable.store'
import { ref } from "vue"
import { useRouter } from "vue-router"

export function useGLPage() {

    // 1️⃣ Local state & composables
    const store = useGlTableStore()
    const storeGl = useGlStore()
    const { handleFetch, data, loading, search, meta, } = useGLTable()
    const perPage = ref(10)
    const router = useRouter();

    // 2️⃣  Methods (local functions, event handlers, dsb.)
    const handlePageChange = async (page: number) => {
        await store.fetch({ page: page, perPage: perPage.value })
    }

    const handlePageSizeChange = async (size: number) => {
        perPage.value = size
        await store.fetch({ page: 1, perPage: perPage.value })
    }

    const handleCuttingIntegrationGl = async (glNumber: string) => {
        await storeGl.fetchSummaryGl(glNumber);
    }

    const navigateToGLDetail = (glNumber: string) => {
        router.push({
            name: 'gls-detail',
            params: {
                id: glNumber
            }
        })
    }



    return {
        data,
        meta,
        search,
        loading,
        handleFetch,
        handlePageChange,
        handlePageSizeChange,
        handleCuttingIntegrationGl,
        navigateToGLDetail
    }
}