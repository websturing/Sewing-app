import { formatDateRangeYMD } from '@/lib/dateRangeFormaterNaive';
import { useEmployeeStore } from '@module/employee/stores/employee.store';
import { DocumentEdit16Filled } from '@vicons/fluent';
import { Trash } from '@vicons/ionicons5';
import { NButton, NIcon, NPopconfirm, NTooltip, type DataTableColumns } from "naive-ui";
import { storeToRefs } from "pinia";
import { computed, h, ref, watch } from "vue";

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
            title: 'Department',
            key: 'department'
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 150,
            render(row: any) {
                return h('div', { class: 'flex items-center gap-2' }, [
                    // Tooltip untuk Edit
                    h(
                        NTooltip,
                        null,
                        {
                            trigger: () =>
                                h(
                                    NButton,
                                    {
                                        type: 'primary',
                                        onClick: () => handleEdit(row),
                                    },
                                    {
                                        default: () =>
                                            h(NIcon, null, {
                                                default: () => h(DocumentEdit16Filled),
                                            }),
                                    },
                                ),
                            default: () => 'Edit Employee',
                        },
                    ),

                    // Popconfirm untuk Delete
                    h(
                        NPopconfirm,
                        {
                            onPositiveClick: () => handleDelete(row),
                        },
                        {
                            trigger: () =>
                                h(
                                    NButton,
                                    { type: 'error' },
                                    {
                                        default: () =>
                                            h(NIcon, null, {
                                                default: () => h(Trash),
                                            }),
                                    },
                                ),
                            default: () => 'Are you sure to delete this record?',
                        },
                    ),
                ])
            }

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

    // contoh handler
    function handleEdit(row: any) {
        alert();
    }

    function handleDelete(row: any) {
        store.deleteEmployee(row.id)
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