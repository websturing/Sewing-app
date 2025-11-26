<template>
    <div class="flex flex-col gap-3">
        <div class="flex justify-between">
            <div class="!w-[300px]">
                <BaseInput :icon="SearchOutline" placeholder="Search" v-model="search" />
            </div>
            <div class="flex gap-2">
                <BaseButton label="Refresh" :icon="RefreshRound" @click="handleRefresh" />
                <BaseButton label="Create Request Replacement" :icon="Repeat" @click="handleRefresh" type="primary" />
            </div>
        </div>
        <n-table>
            <thead>
                <tr>
                    <th class="!w-[20px]">No</th>
                    <th class="!w-[80px]">GL Number</th>
                    <th>Color</th>
                    <th class="!w-[30px]">Cut Pieces</th>
                    <th class=" !w-[30px] !bg-red-100">Defects</th>
                    <th class="!w-[30px]">Balance</th>
                    <th class="!w-[200px] !text-center">Line</th>
                    <th class="!w-[80px]">Status</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="loading">
                    <tr v-for="i in 10" :key="i">
                        <td> <n-skeleton text /></td>
                        <td> <n-skeleton text /></td>
                        <td> <n-skeleton text /></td>
                        <td> <n-skeleton text /></td>
                        <td> <n-skeleton text /></td>
                        <td> <n-skeleton text /></td>
                        <td> <n-skeleton text /></td>
                        <td> <n-skeleton text /></td>
                    </tr>
                </template>
                <template v-else>
                    <tr v-for="(i, index) in dataFilter" :key="i.glNumber">
                        <td>{{ index + 1 }}</td>
                        <td>
                            {{ i.glNumber }}
                        </td>
                        <td>
                            <BaseButton :label="i.color" @click="handleDetailModal(index)" quaternary type="primary" />
                        </td>
                        <td class="text-center">{{ i.totalPcs }}</td>
                        <td class="!bg-red-100 text-center">{{ i.totalDefect }}</td>
                        <td class="text-center">{{ i.totalPcs - i.totalDefect }}</td>
                        <td class="text-center">{{ i.lineNames }}</td>
                        <td>
                            <BaseButton label="Detail" :icon="FolderDetailsReference" @click="handleDetailModal(index)"
                                tertiary />
                        </td>
                    </tr>
                </template>
            </tbody>
        </n-table>
        <n-modal v-model:show="isDetailModal" preset="card" :style="'width: 1200px'"
            :title="`GL-${glDetail?.glNumber.toString()} | ${glDetail?.lineNames}`">
            <div class="flex flex-col gap-5">
                <n-table v-for="e in glDetail?.items">
                    <thead>
                        <tr>
                            <th class="!bg-white">Color</th>
                            <th :colspan="(e.items.length ?? 0) + 1"
                                class="!text-center !bg-white !text-blue-600 !font-semibold">
                                {{ e.color }}
                            </th>
                        </tr>
                        <tr>
                            <th class="!bg-white">Size</th>
                            <th v-for="s in e.items" class="!text-center !bg-white">{{ s.size }}
                            </th>
                            <th class="!bg-white !text-center ">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Cut Piece</td>
                            <td v-for="s in e.items" class="!text-center">{{ s.totalPcs }}</td>
                            <td class="!text-center !font-bold">
                                {{ e.totalPcs }}
                            </td>
                        </tr>
                        <tr>
                            <td>Defect</td>
                            <td v-for="s in e.items" class="!text-center !text-red-400">{{ s.totalDefect }}</td>
                            <td class="!text-center !font-bold !text-red-400">
                                {{ e.totalDefect }}
                            </td>
                        </tr>
                        <tr>
                            <td class="!bg-gray-50">Balance</td>
                            <td v-for="s in e.items" class="!bg-gray-50 !text-center !font-semibold">
                                {{ s.totalPcs - s.totalDefect }}
                            </td>
                            <td class="!bg-gray-50 !text-center !font-bold">
                                {{ (e.totalPcs ?? 0) - (e.totalDefect ?? 0) }}
                            </td>
                        </tr>
                    </tbody>
                </n-table>
            </div>
        </n-modal>

    </div>
</template>

<script setup lang="ts">
import BaseInput from "@/components/BaseInput.vue";
import { useDefectPage } from '@/modules/defect/composables/defect.page';
import type { DefectGroupGlNumber } from "@/modules/defect/schemas/defect.summaryApi";
import { FolderDetailsReference } from "@vicons/carbon";
import { Repeat, SearchOutline } from "@vicons/ionicons5";
import { RefreshRound } from "@vicons/material";
import { computed, ref } from 'vue';

const search = ref("")
const glDetail = ref<DefectGroupGlNumber | null>()
const isDetailModal = ref<boolean>(false)

const {
    loading,
    defectGroupGlNumber: data,
    handleFetchGroupGlNumber
} = useDefectPage()

const dataFilter = computed(() => {
    const searchTerm = search.value.toLowerCase().trim()

    // Jika search kosong, return semua data
    if (!searchTerm) {
        return data.value || []
    }
    // Filter data berdasarkan GL Number dan Color
    return (data.value || []).filter(item =>
        item.glNumber?.toLowerCase().includes(searchTerm) ||
        item.color?.toLowerCase().includes(searchTerm) ||
        item.lineNames?.toLowerCase().includes(searchTerm)
    )
})



const handleRefresh = async () => {
    await handleFetchGroupGlNumber()
}
const handleDetailModal = (index: number) => {
    isDetailModal.value = true
    glDetail.value = data.value[index]
}
</script>