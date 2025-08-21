    <template>
        <div class="p-4">
            <form @submit.prevent="onSubmit">
                <InputWithError v-model="moduleName" name="name" :errors="errors" label="Module Name" />

                <div class="flex gap-2 mb-4 mt-5 items-center">
                    <InputWithError v-model="slugName" name="slug" :errors="errors" label="Slug Name" />
                    <InputWithError v-model="icon" name="slug" :errors="errors" label="Icon" />

                    <div>
                        <label for="order">order</label>
                        <n-input-number id="order" :status="errors.order ? 'error' : ''" v-model:value="order" />
                    </div>
                    <div class="flex-grow-1">
                        <p>&nbsp;</p>
                        <n-switch id="is_active" v-model:value="isActive" :rail-style="railStyle">
                            <template #checked>
                                Active
                            </template>
                            <template #unchecked>
                                inactive
                            </template>
                        </n-switch>
                    </div>

                </div>
                <div class="flex items-center gap-2 mb-4">
                    <div>
                        <p>Parent Menu</p>
                        <n-switch v-model:value="isParent">
                            <template #checked>
                                Select Parent
                            </template>
                            <template #unchecked>
                                Has Parent?"
                            </template>
                        </n-switch>
                    </div>
                    <div class="flex-1" v-if="isParent">
                        <label>Select Parent</label>
                        <n-select size="medium" v-model:value="parentId" :options="parentOptions" optionValue="id"
                            placeholder="Select parent module" />
                    </div>
                </div>
                <n-space class="mt-10" justify="end">
                    <n-button block @click="resetForm">
                        reset
                    </n-button>
                    <n-button type="success" icon-placement="right" attr-type="submit" block>
                        <template #icon>
                            <n-icon>
                                <SendOutline />
                            </n-icon>
                        </template>
                        {{ isEdit ? 'Apply Changes' : 'Create New' }}
                    </n-button>
                </n-space>
            </form>
        </div>
    </template>

<script setup lang="ts">
import InputWithError from '@/components/InputLabelWithError.vue';
import { usePermissionForm } from '@module/permission/composables/usePermissionForm';
import { SendOutline } from '@vicons/ionicons5';
import type { CSSProperties } from 'vue';
// Props
const props = defineProps<{
    initialData?: {
        id?: number
        name?: string
        slug?: string
        parentId?: number | null
        icon?: string
        order?: number
        isActive?: boolean
    }
}>()

// Composable: create/edit tergantung props
const {
    name: moduleName,
    slug: slugName,
    icon,
    order,
    isActive,
    isParent,
    parentId,
    parentOptions,
    errors,
    onSubmit,
    isEdit,
    resetForm
} = usePermissionForm(props.initialData)

const railStyle = ({
    focused,
    checked
}: {
    focused: boolean
    checked: boolean
}) => {
    const style: CSSProperties = {}
    if (checked) {
        style.background = '#18a058'
        if (focused) {
            style.boxShadow = '0 0 0 2px #d0305040'
        }
    }
    else {
        style.background = '#d03050'
        if (focused) {
            style.boxShadow = '0 0 0 2px #2080f040'
        }
    }
    return style
}
</script>