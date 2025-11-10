<template>
    <div class="flex flex-col gap-5">
        <div v-for="e in props.data" :key="e.glNo">
            <div class="flex gap-2 mb-5">
                <p>GL Number</p>
                <p class="font-bold">: {{ e.glNo }}</p>
            </div>

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
                            <td v-for="s in i.sizes" class="!text-red-400  !text-center font-semibold">{{ s.defect }}
                            </td>
                        </tr>
                        <tr>
                            <td class="!bg-gray-50">DIFF</td>
                            <td v-for="s in i.sizes" class="!bg-gray-50 !text-center"> {{ Number(s.pcs) -
                                Number(s.defect) }}
                            </td>
                        </tr>
                    </tbody>
                </n-table>

            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { type LineStockInSummary } from '@/modules/lines/schemas/line.api.schema';

interface Props {
    data: LineStockInSummary[]
}
const props = withDefaults(defineProps<Props>(), {
    data: () => [] as LineStockInSummary[],
})
</script>