import { formatDateRangeYMD } from '@/lib/dateRangeFormaterNaive';
import { useEmployeeStore } from '@module/employee/stores/employee.store';
import { type DataTableColumns } from "naive-ui";
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";

export function useEmployeeTable() {
    const store = useEmployeeStore()
    const { meta, links, search, loading } = storeToRefs(store)
    const rows = computed(() => store.searchedItems)

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
            title: 'Code',
            key: 'employeeCode',
            width: 150,
        },
        {
            title: 'Position',
            key: 'position'
        },
        {
            title: 'department',
            key: 'department'
        },
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
                store.fetchEmployee({
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
        await store.fetchEmployee({ page })
    }

    const handlePageSizeChange = async (size: number) => {
        await store.fetchEmployee({ page: 1, perPage: size })
    }

    const handleRefresh = async () => {
        await store.fetchEmployee()
    }

    return {
        search,
        dateRange,
        loading,
        columns,
        rows,
        meta,
        links,
        handleRefresh,
        handlePageChange,
        handlePageSizeChange
    }
}