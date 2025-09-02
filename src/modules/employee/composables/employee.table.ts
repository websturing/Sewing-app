import { formatDateRangeYMD } from '@/lib/dateRangeFormaterNaive';
import { useEmployeeStore } from '@module/employee/stores/employee.store';
import { Female, Help, Male } from '@vicons/ionicons5';
import { NIcon, NTag, type DataTableColumns } from "naive-ui";
import { storeToRefs } from "pinia";
import { computed, h, ref, watch } from "vue";
import type { Employee } from '../schemas/employeeSchema';
export function useEmployeeTable() {
    const store = useEmployeeStore()
    const { meta, links, search, loading } = storeToRefs(store)
    const rows = computed(() => store.searchedItems)

    const editRow = ref<Employee>();
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
            title: 'Name',
            key: 'name',
        },
        {
            title: 'Gender',
            key: 'gender',
            render: (row: any) => {
                const config = getGenderConfig(row.gender)
                const displayText = capitalizeFirstLetter(row.gender)

                return h(NTag, {
                    color: {
                        color: config.bgColor,
                        borderColor: config.borderColor,
                        textColor: config.textColor
                    },
                    size: 'medium',
                    style: {
                        display: 'inline-flex',
                        alignItems: 'top',
                        gap: '4px',
                        padding: '0px 8px'
                    }
                }, () => [
                    h(NIcon, {
                        component: config.icon,
                        size: 14,
                        style: { marginRight: '2px' }
                    }),
                    displayText
                ])
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

        }
    ]




    function getGenderConfig(gender: string) {
        const lowerGender = gender?.toLowerCase()

        const maleConfig = {
            icon: Male,
            bgColor: '#e6f7ff',
            textColor: '#1890ff',
            borderColor: '#91d5ff'
        }
        const femaleConfig = {
            icon: Female,
            bgColor: '#f3e8fd',
            textColor: '#9b59b6',
            borderColor: '#d8bfd8'
        }

        // Default untuk other/unknown
        const otherConfig = {
            icon: Help,
            bgColor: '#fff2e8',
            textColor: '#fa8c16',
            borderColor: '#ffd591'
        }

        switch (lowerGender) {
            case 'male': return maleConfig
            case 'female': return femaleConfig
            default: return otherConfig
        }
    }
    function capitalizeFirstLetter(text: string): string {
        if (!text) return 'Unknown'
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
    }

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
    function handleEdit(row: Employee) {
        editRow.value = row
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
        editRow,
        handleRefresh,
        handlePageChange,
        handlePageSizeChange
    }
}