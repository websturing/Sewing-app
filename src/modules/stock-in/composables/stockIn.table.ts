import { formatDateRangeYMD } from '@/lib/dateRangeFormaterNaive';
import type { StockInApi } from '@/modules/stock-in/schemas/stockin.api.schema';
import { useStockin } from '@/modules/stock-in/stores/stockIn.store';
import { useMessage, type DataTableColumns } from "naive-ui";
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";

type OptionNotify = {
    notify?: boolean  // default: false
}

export function useStockInTable() {

    const store = useStockin()
    const toast = useMessage()
    const { meta, links, search, loading } = storeToRefs(store)
    const rows = computed(() => store.searchedItems)

    const editRow = ref<StockInApi>();
    const dateRange = ref<[number, number] | null>(null);
    const columns: DataTableColumns<any> = [
        {
            title: 'No',
            key: 'index',
            width: 60,
            render: (_row: any, index: number) => {
                return (meta.value.currentPage - 1) * meta.value.perPage + index + 1
            }
        },
        {
            title: 'GL Number',
            key: 'glNo',
        },
        {
            title: 'Size',
            key: 'size',
            width: 150,
        },
        {
            title: 'Color',
            key: 'color'
        },
        {
            title: 'Pcs',
            key: 'pcs'
        },
        {
            title: 'Input Source',
            key: 'inputSource'
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 150,

        }
    ]


    /**
    * WATCH SEARCH
    */
    watch(search, async (term) => {
        await store.searchOrFetch(term)
    })
    watch(dateRange, async (val) => {

        if (val) {
            const formatted = formatDateRangeYMD(val);
            if (formatted) {
                alert()
                store.fetch({
                    page: 2,
                    dateFrom: formatted[0],
                    dateTo: formatted[1],
                })
            }
        }
    })

    /**
     * HANDLERS
     */
    const handlePageChange = async (page: number) => {
        await store.fetch({ page })
    }

    const handlePageSizeChange = async (size: number) => {
        await store.fetch({ page: 1, perPage: size })
    }

    const handleFetch = async (options: OptionNotify = { notify: true }) => {
        const { success, message } = await store.fetch()
        if (options.notify) {
            success ? toast.success(message) : toast.error(message)
        }

        return { success, message }
    }

    // contoh handler
    function handleEdit(row: StockInApi) {
        editRow.value = row
    }

    function handleDelete(row: any) {
        store.delete(row.id)
    }

    return {
        search,
        dateRange,
        loading,
        columns,
        rows,
        meta,
        links,
        editRow,
        handleFetch,
        handlePageChange,
        handlePageSizeChange
    }
}