<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'

interface Permission {
    action: string
    permissionId: number
}

interface Item {
    id: string | number
    name: string
    permissions?: Permission[]
    children?: Item[]
}

const props = defineProps<{
    item: Item
    index: number
    level: number
    permissionCheckBox: number[]
}>()

const emit = defineEmits<{
    (e: 'update:permissionCheckBox', val: number[]): void
}>()


function findPermissionId(perms: Permission[] = [], action: string): number | undefined {
    return perms.find((p) => p.action === action)?.permissionId
}

const actions = ['read', 'create', 'update', 'delete', 'upload', 'download']
</script>

<template>
    <!-- row untuk item ini -->
    <tr v-if="item && item.name">
        <td class="text-center">{{ level === 0 ? index : '' }}</td>
        <td :style="{ paddingLeft: `${level * 20}px` }" class="!pl-5">
            <span v-if="level === 0" class="font-semibold">{{ item.name }}</span>
            <span v-else class="ml-2">- {{ item.name }}</span>
        </td>

        <!-- checkbox per action -->

        <td v-for="action in actions" :key="action" class="!text-center">
            <n-checkbox-group :value="permissionCheckBox"
                @update:value="(val: number[]) => emit('update:permissionCheckBox', val)">
                <n-checkbox :value="findPermissionId(item.permissions, action)"
                    :disabled="!findPermissionId(item.permissions, action)" />
            </n-checkbox-group>
        </td>
    </tr>

    <!-- render children -->
    <RolesPermissionRowTable v-for="(child, i) in item.children" :key="`${child.id}-${i}`" :item="child" :index="index"
        :level="level + 1" :permissionCheckBox="permissionCheckBox"
        @update:permissionCheckBox="(val: number[]) => emit('update:permissionCheckBox', val)" />
</template>
