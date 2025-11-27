import { useDefectStore } from "@/modules/defect/stores/defect.store";
import { useReplacementStore } from "@/modules/Replacement/stores/replacement.store";
import { useMessage } from "naive-ui";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";

export function useReplacementForm() {
    const toast = useMessage()
    const storeDefect = useDefectStore()
    const store = useReplacementStore()

    const defectColorSizeDetail = ref<any | null>(null)
    const { defectGroupGlNumber } = storeToRefs(storeDefect)



    // Computed Properties
    const optionGlnumbers = computed(() => {
        if (defectGroupGlNumber.value.length > 0) {
            return defectGroupGlNumber.value.map((e) => {
                return {
                    value: e.glNumber,
                    label: e.glNumber
                }
            })
        }
        return []
    })

    // Methods / Functions 

    const handleFilterDefectGlNumber = (val: string | null) => {
        const filter = defectGroupGlNumber.value.find((e) => e.glNumber == val)
        defectColorSizeDetail.value = filter
        defectColorSizeDetail.value.items = filter?.items.map((e: any) => {
            return {
                ...e,
                items: e.items.map((s: any) => ({
                    ...s,
                    maxDefect: s.totalDefect   // clone original
                }))
            }
        })
    }

    const handleFetchGlNumberDefect = async (notify: boolean = false) => {
        const { success, message } = await storeDefect.fetchGroupGlNumber()
        if (notify) {
            success ? toast.success(message) : toast.error(message)
        }
        return { success, message }
    }

    const handleCreateReplacement = async (payload: any) => {
        const { message } = await store.createTicketReplacement(payload)
        toast.success(message)
        return message
    }


    return {
        defectColorSizeDetail,
        optionGlnumbers,
        handleFetchGlNumberDefect,
        handleFilterDefectGlNumber,
        handleCreateReplacement
    }
}