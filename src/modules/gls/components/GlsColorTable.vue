<template>
    <div class="flex flex-col gap-10">
        <n-table :single-line="false">
            <thead>
                <tr class="text-center">
                    <th rowspan="2">Color</th>
                    <th rowspan="2">Type</th>
                    <th rowspan="2">Order</th>
                    <th colspan="4">Cut Pieces Flow</th>
                    <th colspan="2">Sewing Progress</th>
                </tr>
                <tr class="text-center">
                    <th width="100px">Cut</th>
                    <th width="100px">Cut -> Sew</th>
                    <th width="100px">Sew In</th>
                    <th width="100px">Sew Out</th>
                    <th width="100px">Input</th>
                    <th width="100px">Output</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="i in props.data" :key="i.id">
                    <td>
                        <BaseButton :label="i.color" :icon="Color20Filled" :quaternary="true" type="primary"
                            @click="handleColorDetail(i)" />
                    </td>
                    <td width="30px">{{ i.type }}</td>
                    <td class="text-center">{{ i.orderQty }}</td>
                    <td class="text-center">{{ i.cutQty }}</td>
                    <td class="text-center">{{ i.stockOutQty }}</td>
                    <td class="text-center">{{ i.sewingTotalStockinQty }}</td>
                    <td class="text-center">{{ i.sewingTotalStockoutQty }}</td>
                    <td width="80px" :class="[
                        getPercentageColor(calculateSewingPercentage(i.cutQty, i.sewingTotalStockinQty)),
                        'text-center'
                    ]">
                        {{ calculateSewingPercentage(i.cutQty, i.sewingTotalStockinQty)
                        }} %</td>
                    <td width="80px" :class="[
                        getPercentageColor(calculateSewingPercentage(i.sewingTotalStockinQty, i.sewingTotalStockoutQty)),
                        'text-center'
                    ]">{{
                        calculateSewingPercentage(i.sewingTotalStockinQty, i.sewingTotalStockoutQty) }} %</td>
                </tr>
            </tbody>
        </n-table>




        <n-modal v-model:show="showModal" preset="card" :style="'width: 1200px'">
            <template #header>
                <div class="flex justify-between items-end">
                    <div class="flex gap-6 items-end">
                        <div>
                            <p class="text-gray-400 text-sm font-normal">GL Number</p>
                            <p class="font-bold">{{ glNumber }}</p>
                        </div>
                        <div>
                            <p class="text-gray-400 text-sm font-normal">Color</p>
                            <p class="font-bold">{{ colorDetail?.color }}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <div class="flex items-center gap-1 text-sm text-gray-600">
                            <n-icon :component="FolderSync16Regular" :size="24" />
                            <span>{{ colorDetail?.lastSyncAt }}</span>
                        </div>
                        <BaseButton label="Export" :tertinary="true" :icon="DocumentPdf"
                            @click="exportJsonToPdf(colorDetail)" />
                    </div>
                </div>
            </template>
            <div>
                <n-table :single-line="false">
                    <thead>
                        <tr class="text-center">
                            <th rowspan="2">Size</th>
                            <th rowspan="2">Order</th>
                            <th colspan="4">Cut Pieces Flow</th>
                            <th colspan="2">Sewing Progress</th>
                        </tr>
                        <tr class="text-center">
                            <th width="100px">Cut</th>
                            <th width="100px">Cut -> Sew</th>
                            <th width="100px">Sew In</th>
                            <th width="100px">Sew Out</th>
                            <th width="100px">Input</th>
                            <th width="100px">Output</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="i in colorDetail?.sizes" :key="i.id">
                            <td class="text-center">{{ i.size }}</td>
                            <td class="text-center">{{ i.orderQty }}</td>
                            <td class="text-center">{{ i.cutQty }}</td>
                            <td class="text-center">{{ i.stockOutQty }}</td>
                            <td class="text-center">{{ i.sewingStockinQty }}</td>
                            <td class="text-center">{{ i.sewingStockoutQty }}</td>
                            <td width="80px" :class="[
                                getPercentageColor(calculateSewingPercentage(i.cutQty, i.sewingStockinQty)),
                                'text-center'
                            ]">
                                {{ calculateSewingPercentage(i.cutQty, i.sewingStockinQty)
                                }} %</td>
                            <td width="80px" :class="[
                                getPercentageColor(calculateSewingPercentage(i.sewingStockinQty, i.sewingStockoutQty)),
                                'text-center'
                            ]">{{
                                calculateSewingPercentage(i.sewingStockinQty, i.sewingStockoutQty) }} %</td>
                        </tr>
                    </tbody>
                </n-table>
            </div>
        </n-modal>


    </div>
</template>
<script setup lang="ts">
// 1️⃣ Imports
import BaseButton from "@/components/BaseButton.vue";
import { type GLCombineColor } from '@/modules/gls/schemas/glsCombine.api';
import { DocumentPdf } from "@vicons/carbon";
import { Color20Filled, FolderSync16Regular } from "@vicons/fluent";
import { jsPDF } from "jspdf";
import autoTable, { type RowInput } from "jspdf-autotable";
import { ref } from "vue";
// 2️⃣ Props (kalau ada)
interface Props {
    data: GLCombineColor[],
    glNumber: string
}

const props = withDefaults(defineProps<Props>(), {
    data: () => [] as GLCombineColor[],
    isLoading: false,
})


const colorDetail = ref<GLCombineColor>()
const showModal = ref<boolean>(false)


// 5️⃣ Lifecycle hooks
// 6️⃣ Computed / watchers (kalau ada)
// 7️⃣ Methods (local functions, event handlers, dsb.)
const calculateSewingPercentage = (toSew: any, sewingOut: any) => {
    if (!toSew || toSew <= 0) return 0;
    const percentage = (sewingOut / toSew) * 100;
    return Number(percentage.toFixed(2));
}

const getPercentageColor = (value: number) => {
    if (value <= 0) return;

    const percentage = value;

    if (percentage < 50) return '!bg-red-200';
    if (percentage < 80) return '!bg-amber-200';
    return '!bg-green-200';
}

const handleColorDetail = (item: GLCombineColor) => {
    showModal.value = true
    colorDetail.value = item
}


const exportJsonToPdf = (data: GLCombineColor | undefined) => {
    const doc = new jsPDF("landscape", "mm", "a4");

    const pageWidth = doc.internal.pageSize.getWidth();

    // 🧾 Header perusahaan dan laporan
    doc.setFontSize(12);
    doc.text("PT. Ghim Li Indonesia", 14, 18);
    doc.setFontSize(14);
    doc.text("Production Summary", pageWidth / 2, 12, { align: "center" });

    doc.setFontSize(12);
    doc.text(`${props.glNumber} - ${data?.color}`, pageWidth / 2, 18, { align: "center" });
    doc.setFontSize(9);
    doc.text(`Print Date: ${new Date().toLocaleString("id-ID")}`, pageWidth - 14, 18, { align: "right" });

    // 🧱 Header tabel (multi-row + colspan)
    const head: RowInput[] = [
        [
            { content: "Size", rowSpan: 2 },
            { content: "Order", rowSpan: 2 },
            { content: "Cut Pieces Flow", colSpan: 4, styles: { halign: "center" } },
            { content: "Sewing Progress", colSpan: 2, styles: { halign: "center" } },
        ],
        [
            { content: "Cut" },
            { content: "Cut To Sew" },
            { content: "Sew In" },
            { content: "Sew Out" },
            { content: "Input %" },
            { content: "Output %" },
        ],
    ];

    const body = data?.sizes.map((i) => [
        i.size,
        i.orderQty,
        i.cutQty,
        i.stockOutQty,
        i.sewingStockinQty,
        i.sewingStockoutQty,
        `${((i.sewingStockinQty / i.cutQty) * 100).toFixed(1)}%`,
        `${((i.sewingStockoutQty / i.cutQty) * 100).toFixed(1)}%`,
    ]);

    autoTable(doc, {
        startY: 22,
        head,
        body,
        theme: "grid",
        styles: {
            fontSize: 9,
            cellPadding: 3,
            halign: "center",
            valign: "middle",
            lineWidth: 0.1, // border tipis
        },
        headStyles: {
            fillColor: [255, 255, 255],
            textColor: [0, 0, 0],
            fontStyle: "bold",
            lineWidth: 0.1,
        },

        // ⬇️ Tambahan supaya header tetap ada border meskipun colspan
        didDrawCell: (data) => {
            if (data.section === "head") {
                const { cell, doc } = data;
                doc.setLineWidth(0.1);
                doc.rect(cell.x, cell.y, cell.width, cell.height);
            }
        },
    });

    doc.save("sewing-report.pdf");
};

</script>