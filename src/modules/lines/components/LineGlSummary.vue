<template>
    <div>
        <div v-for="e in props.data" :key="e.glNo">
            <div class="flex gap-2">
                <p>GL Number</p>
                <p class="font-bold">: {{ e.glNo }}</p>
            </div>

            <div v-for="i in e.colors">
                <n-table>
                    <thead>
                        <tr>
                            <th>Color</th>
                            <th :colspan="i.sizes.length" class="!text-center">{{ i.color }}</th>
                        </tr>
                        <tr>
                            <th>Size</th>
                            <th v-for="s in i.sizes">{{ s.size }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Cut Piece In</td>
                            <td v-for="s in i.sizes">{{ s.pcs }}</td>
                        </tr>
                    </tbody>
                </n-table>
            </div>
        </div>

        {{ props.data }}
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