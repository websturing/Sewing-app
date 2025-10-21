import { useFields } from "@/composables/useFieldWrapper";
import { formatDateRangeYMD } from '@/lib/dateRangeFormaterNaive';
import { AssignmentLinesFormSchema, type AssignmentLinesForm } from "@/modules/assignment-lines/schemas/AssignmentLines.form.schema";
import { useAssignmentLinesStore } from "@/modules/assignment-lines/stores/AssignmentLines.store";
import { useGlStore } from "@/modules/gls/stores/gls.store";
import { toTypedSchema } from '@vee-validate/zod';
import { storeToRefs } from "pinia";
import { useForm } from 'vee-validate';
import { ref, watch } from "vue";



export function useAssignmentLinesForm(initialData: any = null) {


    const store = useAssignmentLinesStore();
    const storeGl = useGlStore();
    const dateRangeUnformated = ref<[number, number] | null>(null);
    const { loading: isLoading } = storeToRefs(store);

    const getDefaults = () => ({
        glNumber: initialData?.glNumber ?? "",
        lineId: initialData?.lineId ?? "",
        layingPlanning: initialData?.layingPlanning ?? {},
        dateRange: initialData?.dateRange ?? [],
    })

    const { handleSubmit, errors, isSubmitting, resetForm: veeResetForm, validate: veeValidate } = useForm<AssignmentLinesForm>({
        validationSchema: toTypedSchema(AssignmentLinesFormSchema),
        initialValues: getDefaults()
    })



    const resetForm = () => {
        veeResetForm({
            values: getDefaults(), errors: {}
        })
    }

    /** FIELD DATA */
    const fields = useFields<AssignmentLinesForm>(["glNumber", "lineId", "layingPlanning", "dateRange", "glId", "dateStart", "dateEnd"]);
    const { glId, glNumber, lineId, layingPlanning, dateRange, dateStart, dateEnd } = fields;


    const validateForm = async (): Promise<{ valid: boolean; values?: AssignmentLinesForm }> => {
        const result = await veeValidate()
        if (!result.valid) return { valid: false }
        return { valid: true, values: result.values as AssignmentLinesForm }
    }
    const onSubmit = (fn: (values: any) => void | Promise<void>) => {
        return handleSubmit(fn)
    }


    watch(dateRangeUnformated, async (val) => {
        if (val) {
            const formatted = formatDateRangeYMD(val);
            if (formatted) {
                dateRange.value.push(formatted[0], formatted[1])
                dateStart.value = formatted[0]
                dateEnd.value = formatted[1]
            }
        }
    })

    watch(glNumber, async (val) => {
        const { id } = await storeGl.fetchGLNumber(val)
        console.log(id)
        glId.value = id || 0
    })


    return {
        glNumber,
        lineId,
        isLoading,
        layingPlanning,
        dateRangeUnformated,
        errors,
        isSubmitting,
        validateForm,
        onSubmit,
        handleSubmit,
        resetForm,
    }
}