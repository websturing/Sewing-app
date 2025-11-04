import { useGLChart } from "@/modules/gls/composables/gls.chart"
import { useGLTable } from "@/modules/gls/composables/gls.table"
import { useGlStore } from "@/modules/gls/stores/gls.store"
import { useGlSyncCuttingStore } from "@/modules/gls/stores/glsSync.store"
import { useGlTableStore } from '@/modules/gls/stores/glsTable.store'
import { useMessage } from 'naive-ui'
import { storeToRefs } from "pinia"
import { ref } from "vue"
import { useRouter } from "vue-router"

export function useGLPage() {

    // 1️⃣ Local state & composables
    const toast = useMessage()
    const store = useGlTableStore()
    const storeGl = useGlStore()
    const storeGlCombine = useGlSyncCuttingStore()
    const { handleFetch, data, loading, search, meta, } = useGLTable()
    const { data: glCombineData, loading: glCombineLoading, colors: glCombineColors } = storeToRefs(storeGlCombine);
    const { matrixData, matrixSummary, GLNumberOptionsEchart, handleFetchGLMatrix } = useGLChart()

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

    const handleSyncCuttingGL = async (glNumber: string) => {
        const { success, message } = await storeGlCombine.fetchSyncCuttingGL(glNumber);

        success ? toast.success(message) : toast.error(message)
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
        glCombineData,
        glCombineColors,
        glCombineLoading,

        matrixData,
        matrixSummary,
        GLNumberOptionsEchart,


        handleFetch,
        handlePageChange,
        handlePageSizeChange,
        handleCuttingIntegrationGl,
        handleSyncCuttingGL,
        navigateToGLDetail,



        handleFetchGLMatrix
    }
}