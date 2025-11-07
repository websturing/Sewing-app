import { useLinePage } from '@/modules/lines/composables/line.page';
import { useLineStore } from "@/modules/lines/stores/line.store";
import { storeToRefs } from 'pinia';

export function useLineTable() {
    const store = useLineStore()
    const { data: rows, loading, meta, links } = storeToRefs(store)

    const { handleFetch } = useLinePage()



    const handlePageChange = async (page: number) => {
        await handleFetch({ notify: false }, { page })
    }

    const handlePageSizeChange = async (size: number) => {
        await handleFetch({ notify: false }, { page: 1, perPage: size })
    }

    const handleRefresh = async () => {
        await handleFetch({ notify: false }, {})
    }

    return {
        rows,
        loading,
        meta,
        links,
        handleFetch,
        handlePageChange,
        handlePageSizeChange,
        handleRefresh
    }




}