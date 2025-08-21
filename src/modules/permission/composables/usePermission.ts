import { useModuleStore } from "@module/permission/stores/permission";
import { ColorWand, Trash } from "@vicons/ionicons5";
import { NButton, NPopconfirm, NSpace, NTooltip, useMessage, type DataTableColumns } from "naive-ui";
import { storeToRefs } from "pinia";
import { computed, h, ref } from "vue";

export function usePermission(options?: {
    onEdit?: (row: any) => void
}) {
    const store = useModuleStore()
    const message = useMessage()
    const { data, loading } = storeToRefs(store)
    const searchRef = ref('')

    const filteredData = computed(() => {
        if (!searchRef.value) return data.value

        return data.value.filter(module =>
            module.name.toLowerCase().includes(searchRef.value.toLowerCase())
        )
    })


    // State pagination
    const page = ref(1)
    const pageSize = ref(5)

    // Dropdown pilihan size
    const pageSizes = [5, 10, 20, 50]




    // Definisi kolom
    const columns: DataTableColumns = [
        {
            title: "No",
            key: "index",
            render: (_row, index) => index + 1 // index dimulai dari 0, jadi +1
        },
        {
            title: "Name",
            key: "name"
        },
        {
            title: "Slug",
            key: "slug"
        },
        {
            title: "Actions",
            key: "actions",
            render: (row) =>
                h(
                    NSpace,
                    { justify: "center" },
                    {
                        default: () => [
                            h(
                                NTooltip,
                                { placement: "top" },
                                {
                                    trigger: () =>
                                        h(
                                            NButton,
                                            {
                                                size: "small",
                                                quaternary: true,
                                                onClick: () => handleEdit(row)
                                            },
                                            {
                                                default: () => "Edit",
                                                icon: () => h(ColorWand)
                                            }
                                        ),
                                    default: () => "Edit data"
                                }
                            ),
                            // Tooltip + Popconfirm Delete
                            h(
                                NPopconfirm,
                                {
                                    onPositiveClick: () => handleDelete(row),
                                    negativeText: "Cancel",
                                    positiveText: "Delete",
                                    positiveButtonProps: {
                                        type: "error",
                                        size: "small",
                                        ghost: true
                                    },
                                    negativeButtonProps: {
                                        type: "default",
                                        size: "small"
                                    }
                                },
                                {
                                    trigger: () =>
                                        h(
                                            NButton,
                                            {
                                                size: "small",
                                                type: "error",
                                                quaternary: false
                                            },
                                            {
                                                default: () => "Delete",
                                                icon: () => h(Trash)
                                            }
                                        ),
                                    default: () => "Are you sure you want to proceed?"
                                }
                            )
                        ]
                    }
                )
        }

    ]

    // Contoh handler
    function handleEdit(row: any) {
        if (options?.onEdit) {
            options.onEdit(row)
        }
        else {
            console.log("Edit row:", row)
        }
    }

    async function handleDelete(row: any) {
        const res: string = await store.deleteModule(row.id)
        message.info(res)
    }
    const fnRefresh = () => {
        store.fetchModule()
    }

    return {
        data,
        loading,
        columns,
        searchRef,
        page,
        pageSize,
        pageSizes,
        filteredData,
        fnRefresh
    }

}