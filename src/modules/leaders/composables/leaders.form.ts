import { useFields } from "@/composables/useFieldWrapper";
import type { AssignLeaderForm } from "@/modules/leaders/schemas/leaders.form.schema";
import { AssignLeaderFormSchema } from "@/modules/leaders/schemas/leaders.form.schema";
import type { UnassignLeaderRequest } from "@/modules/leaders/schemas/leaders.request.schema";
import { useLeaderStore } from "@/modules/leaders/stores/leaders.store";
import { useLinePage } from "@/modules/lines/composables/line.page";
import { useUserTable } from "@/modules/user/composables/user.table";
import { toTypedSchema } from "@vee-validate/zod";
import { useMessage } from "naive-ui";
import { useForm } from "vee-validate";
import { computed, ref } from "vue";

export function useLeadersForm(initialData: AssignLeaderForm | null = null) {
    const toast = useMessage();
    const store = useLeaderStore();
    const isLoading = ref<boolean>(false)

    /** USERS & LINES */
    const { rows: usersData, handleFetch: fetchUsers } = useUserTable();
    const { data: linesData, handleFetch: fetchLines } = useLinePage();

    const optionUsers = computed(() =>
        usersData.value.map((e) => ({ label: e.name, value: e.id }))
    );

    const optionLines = computed(() =>
        linesData.value.map((e) => ({ label: e.name, value: e.id }))
    );

    const handleCreateAssignLeader = async (payload: AssignLeaderForm) => {
        isLoading.value = true
        await store.createAssignLeader(payload)
        isLoading.value = false
    }

    const handleUnassignLeader = async (payload: UnassignLeaderRequest) => {
        isLoading.value = true
        const { success, message } = await store.unAssignLeader(payload)
        success ? toast.success(message) : toast.error(message)
        isLoading.value = false
    }


    /** PRELOAD COMBO DATA */
    const handleUserLineData = async () => {
        await Promise.all([
            fetchUsers(),
            fetchLines({ notify: false }, {
                perPage: 200
            }),
        ]);
    };

    /** DEFAULT VALUES */
    const getDefaults = (): AssignLeaderForm => ({
        userId: initialData?.userId ?? null,
        lineId: initialData?.lineId ?? [],
        isActive: initialData?.isActive ?? true, // kamu punya switch, jadi sekalian masukin
    });

    /** ZOD VALIDATION / FORM */
    const {
        handleSubmit,
        errors,
        isSubmitting,
        resetForm: veeResetForm,
        validate: veeValidate,
    } = useForm<AssignLeaderForm>({
        validationSchema: toTypedSchema(AssignLeaderFormSchema),
        initialValues: getDefaults(),
    });

    /** FIELD BINDINGS */
    const { userId, lineId, isActive } = useFields<{
        userId: number | null;
        lineId: number[];
        isActive: boolean
    }>(["userId", "lineId", "isActive"]);

    /** Validate manually if needed */
    const validateForm = async () => {
        const result = await veeValidate();
        return result.valid
            ? { valid: true, values: result.values as AssignLeaderForm }
            : { valid: false };
    };

    /** Soft reset */
    const resetForm = () => {
        veeResetForm({ values: getDefaults(), errors: {} });
    };

    return {
        /** base */
        isLoading,

        /** Form binding */
        userId,
        lineId,
        isActive,

        /** Combo Data */
        optionUsers,
        optionLines,
        handleUserLineData,

        /** Form Behavior */
        onSubmit: handleSubmit,
        resetForm,
        errors,
        isSubmitting,
        validateForm,
        handleCreateAssignLeader,
        handleUnassignLeader
    };
}
