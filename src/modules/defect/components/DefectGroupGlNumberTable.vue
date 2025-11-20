<template>
    <div>
        <n-table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>GL Number</th>
                    <th>Color</th>
                    <th class="!w-[30px]">Cut Pieces</th>
                    <th class=" !w-[30px] !bg-red-100">Defects</th>
                    <th class="!w-[30px]">Balance</th>
                    <th class="!text-center">Line</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(i, index) in data" :key="i.glNumber">
                    <td>{{ index + 1 }}</td>
                    <td>{{ i.glNumber }}</td>
                    <td>{{ i.color }}</td>
                    <td class="text-center">{{ i.totalPcs }}</td>
                    <td class="!bg-red-100 text-center">{{ i.totalDefect }}</td>
                    <td class="text-center">{{ i.totalPcs - i.totalDefect }}</td>
                    <td class="text-center">{{ i.lineNames }}</td>
                    <td>1</td>
                </tr>
            </tbody>
        </n-table>
    </div>
</template>

<script setup lang="ts">
import { useDefectPage } from '@/modules/defect/composables/defect.page';


const {
    defectGroupGlNumber: data
} = useDefectPage()

</script>