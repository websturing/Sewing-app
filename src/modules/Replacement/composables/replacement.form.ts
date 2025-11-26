import { useDefectStore } from "@/modules/defect/stores/defect.store";
import type { MetaHead } from '@/types/metaHead';
import { useHead } from '@unhead/vue';
import { useMessage } from "naive-ui";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";

export function useReplacementForm() {
    const toast = useMessage()
    const storeDefect = useDefectStore()

    const defectColorSizeDetail = ref<any | null>(null)
    const { defectGroupGlNumber } = storeToRefs(storeDefect)

    const meta = ref<MetaHead>({
        title: "Defect Replacement Ticket Form",
        description: "A streamlined form interface for issuing replacement tickets tied to defective GL numbers identified during stock-in or sewing operations."
    })

    useHead({
        title: meta.value.title,
        meta: [
            { name: 'description', content: meta.value.description }
        ]
    })

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
    }

    const handleFetchGlNumberDefect = async (notify: boolean = false) => {
        const { success, message } = await storeDefect.fetchGroupGlNumber()
        if (notify) {
            success ? toast.success(message) : toast.error(message)
        }
        return { success, message }
    }

    return {
        meta,
        defectColorSizeDetail,
        optionGlnumbers,
        handleFetchGlNumberDefect,
        handleFilterDefectGlNumber
    }
}