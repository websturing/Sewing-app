<template>
    <div>
        <n-table :size="props.size">
            <thead>
                <tr>
                    <th v-for="col in props.columns" :key="col.key" :class="col.classTh" :width="col.width">
                        {{ col.title }}
                    </th>
                </tr>
            </thead>

            <tbody>
                <template v-if="!props.isLoading">
                    <template v-if="props.rows.length == 0">
                        <tr>
                            <td :colspan="props.columns.length" class="!p-10">
                                <n-empty description="Nothing here yet — start by creating a new record">
                                </n-empty>
                            </td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr v-for="(row, rowIndex) in props.rows" :key="rowIndex">
                            <template v-for="col in props.columns" :key="col.key">
                                <td v-if="col.key === 'no'" width="40" class="text-center font-semibold">
                                    {{ (props.meta.currentPage - 1) * props.meta.perPage + rowIndex + 1 }}
                                </td>

                                <td v-else>
                                    <slot :name="col.key" :row="row" :index="rowIndex" :value="row[col.key]">
                                        <div v-if="col.isJoinArray" :class="col.classRow">
                                            {{ row[col.key]?.join(" · ") }}
                                        </div>
                                        <div v-else :class="col.classRow">
                                            {{ row[col.key] }}
                                        </div>
                                    </slot>
                                </td>
                            </template>
                        </tr>
                    </template>

                </template>
                <template v-else>
                    <tr v-for="i in 10" :key="i">
                        <template v-for="col in props.columns" :key="col.key">
                            <td v-if="col.key === 'no'" width="40">
                                <n-skeleton :height="30" />
                            </td>
                            <td v-else>
                                <n-skeleton :height="25" />
                            </td>
                        </template>
                    </tr>
                </template>
            </tbody>
        </n-table>

        <div class="flex justify-end mt-4">
            <n-pagination :page="props.meta.currentPage" :page-size="props.meta.perPage"
                :page-count="props.meta.lastPage" show-size-picker :page-sizes="[1, 5, 10, 20, 50]"
                @update:page="(page: any) => emit('update:page', page, props.meta.perPage)"
                @update:page-size="(perPage: any) => emit('update:pageSize', 1, perPage)" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Meta } from '@/types/metaPagination'

interface Column {
    key: string
    title: string
    classTh?: string
    classRow?: string
    isJoinArray?: boolean
    width?: number
}

interface Props {
    columns: Column[]
    rows: Record<string, any>[]
    meta: Meta
    size?: "small" | "medium" | "large"
    isLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    size: "medium",
    isLoading: false
})

const emit = defineEmits<{
    (e: "update:page", page: number, perPage: number): void
    (e: "update:pageSize", page: number, perPage: number): void
}>()
</script>
