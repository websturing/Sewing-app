import { formatDateRangeYMD } from '@/lib/dateRangeFormaterNaive';
import type { User } from '@/modules/user/schemas/user.schema';
import { useUserStore } from '@/modules/user/stores/user.store';
import { NTag, type DataTableColumns } from "naive-ui";
import { storeToRefs } from "pinia";
import { computed, h, ref, watch } from "vue";

export function useUserTable() {

    const store = useUserStore()
    const { meta, links, search, loading, data } = storeToRefs(store)
    const rows = computed(() => store.searchedItems)

    const editRow = ref<User>();
    const dateRange = ref<[number, number] | null>(null);

    const availableColors = [
        "default",
        "primary",
        "info",
        "success",
        "warning",
        "error"
    ] as const

    // bikin type dari isi array
    type TagType = typeof availableColors[number]

    const roleColorMap = new Map<string, TagType>()

    function getRoleColor(role: string): TagType {
        if (!roleColorMap.has(role)) {
            const color = availableColors[Math.floor(Math.random() * availableColors.length)]
            roleColorMap.set(role, color)
        }
        return roleColorMap.get(role)!
    }

    const columns: DataTableColumns<any> = [
        {
            title: "No",
            key: "index",
            width: 60,
            render: (_row: any, index: number) => {
                return (meta.value.currentPage - 1) * meta.value.perPage + index + 1
            },
        },
        {
            title: "Name",
            key: "name",
        },
        {
            title: "Email",
            key: "email",
        },
        {
            title: "Roles",
            key: "roleNames",
            render: (row: any) => {
                if (!row.roleNames || row.roleNames.length === 0) {
                    return h(NTag, { type: "warning", size: "small" }, { default: () => "No Access Role" })
                }
                return row.roleNames.map((role: string) =>
                    h(
                        NTag,
                        { type: getRoleColor(role), size: "small", class: "mr-1" },
                        { default: () => role }
                    )
                )
            },
        },
        {
            title: "Actions",
            key: "actions",
            width: 150,
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

    const handleFetch = async () => {
        await store.fetch()
    }

    // contoh handler
    function handleEdit(row: User) {
        editRow.value = row
    }

    function handleDelete(row: any) {
        store.delete(row.id)
    }

    return {
        data,
        search,
        dateRange,
        loading,
        columns,
        rows,
        meta,
        links,
        editRow,
        handleEdit,
        handleDelete,
        handleFetch,
        handlePageChange,
        handlePageSizeChange
    }
}