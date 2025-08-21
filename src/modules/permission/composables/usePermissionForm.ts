import { useModuleStore } from '@/modules/permission/stores/permission'
import { permissionModuleCreateSchema } from '@module/permission/schemas/permissionSchema'
import { useMessage } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { useField, useForm } from 'vee-validate'
import { computed, ref, watch } from 'vue'

const isModal = ref(false);

export function usePermissionForm(initialData: any = null) {
    const moduleStore = useModuleStore()
    const message = useMessage()


    const { data: parentData } = storeToRefs(moduleStore)

    const parentId = ref<number | null>(initialData?.parentId || null)
    const parentOptions = computed(() => {
        return parentData.value.map((item) => {
            return {
                label: item.name,
                value: item.id
            }
        })
    })

    const { handleSubmit, errors, isSubmitting, resetForm: veeResetForm, setValues } = useForm<{
        name: string
        slug: string
        icon: string
        order: number,
        isActive: boolean

    }>({
        validationSchema: permissionModuleCreateSchema,
        initialValues: {
            name: initialData?.name || '',
            slug: initialData?.slug || '',
            icon: initialData?.icon || '',
            order: initialData?.order || 1,
            isActive: initialData?.isActive || true
        }
    })

    const { value: name } = useField<string>('name')
    const { value: slug } = useField<string>('slug')
    const { value: icon } = useField<string>('icon')
    const { value: order } = useField<number>('order')
    const { value: isActive } = useField<boolean>('isActive')

    const isParent = ref(initialData?.parentId == null ? false : true) // true jika tidak ada parent_id
    const isEdit = ref(!!initialData?.id) // true kalau edit

    console.log('edit data', isEdit.value)

    const resetForm = () => {
        veeResetForm({
            values: {
                name: '',
                slug: '',
                icon: '',
                isActive: true
            },
            errors: {}
        })
        parentId.value = null
        isParent.value = false
    }

    const onSubmit = handleSubmit(async (values) => {
        try {
            const moduleData = {
                name: values.name,
                slug: values.slug,
                icon: values.icon,
                order: values.order,
                isActive: values.isActive,
                parentId: parentId.value
            }

            if (isEdit.value) {
                try {
                    const res: string = await moduleStore.updateModule(initialData.id, moduleData)
                    message.success(res)   // notifikasi sukses
                    isModal.value = false
                    resetForm()            // reset form setelah berhasil
                } catch (err: any) {
                    message.error(err || "Gagal menyimpan data")
                }

            } else {
                try {
                    const res: string = await moduleStore.createModule(moduleData)
                    message.success(res)
                    isModal.value = false
                    resetForm()
                } catch (err: any) {
                    message.error(err || "Gagal menyimpan data")
                }
            }
        } catch (error) {
            console.error('Error submitting form:', error)
        }
    })


    watch(isParent, () => {
        if (!isParent.value) {
            parentId.value = null
        }
    }, { immediate: true })



    return {
        isModal,
        name,
        slug,
        icon,
        order,
        isActive,
        parentId,
        isParent,
        isEdit,
        onSubmit,
        resetForm,
        parentData,
        parentOptions,
        errors,
        isSubmitting,
    }
}