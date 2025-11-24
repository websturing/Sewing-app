import type { AssignLeaderForm } from "@/modules/leaders/schemas/leaders.form.schema";
import { AssignLeaderFormSchema } from "@/modules/leaders/schemas/leaders.form.schema";
import { useLeaderStore } from "@/modules/leaders/stores/leaders.store";
import { toTypedSchema } from '@vee-validate/zod';
import { useMessage } from "naive-ui";
import { useForm } from 'vee-validate';

type OptionNotify = {
    notify?: boolean
}

export function useLeadersForm(initialData: AssignLeaderForm | null = null) {
    const toast = useMessage()
    const store = useLeaderStore()

    const getDefaults = (): AssignLeaderForm => ({
        userId: initialData?.userId ?? 0
    })

    const {
        handleSubmit,
        errors,
        isSubmitting,
        resetForm: veeResetForm,
        validate: veeValidate,
    } = useForm<AssignLeaderForm>({
        validationSchema: toTypedSchema(AssignLeaderFormSchema),
        initialValues: getDefaults()
    })

    // reset form
    const resetForm = () => {
        veeResetForm({
            values: getDefaults(), errors: {}
        })
    }

    return {
        onSubmit: handleSubmit,
        resetForm,
        errors,
        isSubmitting,
    }

}