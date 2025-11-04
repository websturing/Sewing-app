<template>
    <div>
        <n-table :single-line="false">
            <thead>
                <tr class="text-center">
                    <th rowspan="2">Size</th>
                    <th colspan="3">Total</th>
                </tr>
                <tr class="text-center">
                    <th width="100px">Cut Pcs</th>
                    <th width="100px">Bundles</th>
                    <th width="100px">Colors</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="e in props.data">
                    <td>{{ e.size }}</td>
                    <td>{{ e.totalPcs }}</td>
                    <td>{{ e.totalBundle }}</td>
                    <td>{{ e.totalColors }}</td>
                </tr>
            </tbody>
        </n-table>
    </div>
</template>
<script setup lang="ts">
import { type matrixItem } from "@/modules/gls/schemas/gls.matrix.schema";

interface Props {
    data: matrixItem[]
}

const props = withDefaults(defineProps<Props>(), {

})
</script>