<template>
    <div class="flex flex-col gap-5">
        <n-tabs v-model:value="activeTab" type="card" animated>
            <n-tab-pane v-for="e in props.data" :key="e.glNo" :name="e.glNo" :tab="`GL-${e.glNo.toString()}`">
                <div class="flex gap-2 flex-wrap">
                    <n-table v-for="i in e.colors" class="flex-1">
                        <thead>
                            <tr>
                                <th>Color</th>
                                <th :colspan="i.sizes.length" class="!text-center">{{ i.color }}</th>
                            </tr>
                            <tr>
                                <th>Size</th>
                                <th v-for="s in i.sizes" class="!text-center">{{ s.size }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>CUT PIECE IN</td>
                                <td v-for="s in i.sizes" class="font-semibold !text-center">{{ s.pcs }}</td>
                            </tr>
                            <tr>
                                <td>DEFECT</td>
                                <td v-for="s in i.sizes" class="!text-red-400 !text-center font-semibold">
                                    {{ s.defect }}
                                </td>
                            </tr>
                            <tr>
                                <td class="!bg-gray-50">DIFF</td>
                                <td v-for="s in i.sizes" class="!bg-gray-50 !text-center">
                                    {{ Number(s.pcs) - Number(s.defect) }}
                                </td>
                            </tr>
                        </tbody>
                    </n-table>
                </div>
            </n-tab-pane>
        </n-tabs>
    </div>
</template>

<script lang="ts" setup>
import { type LineStockInSummary } from '@/modules/lines/schemas/line.api.schema';
import { ref, watch } from 'vue';

interface Props {
    data: LineStockInSummary[]
}

const props = withDefaults(defineProps<Props>(), {
    data: () => [] as LineStockInSummary[],
})

// 🧠 Default tab: ambil glNo pertama kalau ada
const activeTab = ref<string | null>(null)

watch(
    () => props.data,
    (val) => {
        if (val.length > 0 && !activeTab.value) {
            activeTab.value = val[0].glNo
        }
    },
    { immediate: true }
)
</script>
