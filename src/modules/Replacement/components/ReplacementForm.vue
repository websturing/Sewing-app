<template>
    <div class="flex flex-col gap-10">
        <div class="flex justify-between items-center">
            <div class="w-84 flex-auto">
                <h2 class="text-xl font-bold mb-1">{{ meta.title }}</h2>
                <p>{{ meta.description }}</p>
            </div>
            <div class="w-16 flex-auto text-right">
                <n-breadcrumb>
                    <n-breadcrumb-item><n-icon :component="SmartHome" /> Home</n-breadcrumb-item>
                    <n-breadcrumb-item>
                        <n-icon :component="Forms" />
                        Replacement Form
                    </n-breadcrumb-item>
                </n-breadcrumb>
            </div>
        </div>

        <div>
            <BaseSelectWithError name="glNumber" :options="optionGlnumbers" label="GL Numbers" v-model="glNumber"
                placeholder="Select GL Number" />
        </div>

        <n-table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Color</th>
                    <th>Size</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(i, index) in defectColorSizeDetail?.items">
                    <td>{{ index + 1 }}</td>
                    <td>{{ i.color }}</td>
                    <td></td>
                </tr>
            </tbody>
        </n-table>


        <pre>
        {{ defectColorSizeDetail }}
        </pre>

    </div>
</template>
<script setup lang="ts">
import { useReplacementForm } from '@/modules/Replacement/composables/replacement.form';
import { Forms, SmartHome } from '@vicons/tabler';
import { onMounted, ref, watch } from "vue";

const glNumber = ref<string | null>(null)

const {
    meta,
    optionGlnumbers,
    defectColorSizeDetail,
    handleFetchGlNumberDefect,
    handleFilterDefectGlNumber
} = useReplacementForm()

watch(glNumber, (newValue, oldValue) => {
    handleFilterDefectGlNumber(newValue);
});

onMounted(() => {
    handleFetchGlNumberDefect()
})
</script>