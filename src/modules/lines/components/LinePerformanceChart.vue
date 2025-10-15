<template>
    <div>
        <p class="mb-2 text-gray-400">Top Line Performance</p>
        <div class="flex flex-col gap-2">
            <n-card class="shadow-xs cursor-pointer hover:!bg-gray-50"
                v-for="(item) in props.line.slice(0, props.slice)" :key="item.id" :content-style="{ padding: 0 }">
                <div class="flex justify-between px-4 py-2">
                    <div>
                        <p class="font-semibold">{{ item.name }}</p>
                        <span class="text-sm text-gray-400 flex items-center gap-1">
                            <n-icon :component="LocationCurrent" />
                            {{ item.location }}
                        </span>
                    </div>
                    <div>
                        <div class="text-right">
                            <p class="font-semibold">
                                {{ item.pcs }}
                                <span class="text-sm text-gray-400">pcs</span>
                            </p>
                            <span class="text-sm text-gray-400 ">{{ item.lastUpdated }}</span>
                        </div>
                    </div>
                </div>


            </n-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { LocationCurrent } from '@vicons/carbon';


interface Props {
    line: {
        id: number
        name: string
        location: string | null
        pcs: number
        lastUpdated: string | null
    }[],
    slice?: number
}
const props = withDefaults(defineProps<Props>(), {
    line: () => [],
    slice: 3
})

</script>