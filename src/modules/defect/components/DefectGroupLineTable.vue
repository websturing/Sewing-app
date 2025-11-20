<template>
    <div>
        <n-table>
            <thead>
                <tr>
                    <th>Line</th>
                    <th>GL Number</th>
                    <th>Color</th>
                    <th>Cut Pieces</th>
                    <th>Defects</th>
                    <th>Balance</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(i) in data" :key="i.lineName">
                    <td>{{ i.lineName }}</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                </tr>
            </tbody>
        </n-table>
    </div>
</template>

<script setup lang="ts">
import { useDefectPage } from '@/modules/defect/composables/defect.page';


const {
    defectGroupLines: data
} = useDefectPage()

</script>