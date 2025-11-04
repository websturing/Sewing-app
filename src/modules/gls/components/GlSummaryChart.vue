<template>
    <div class="flex flex-col gap-5">
        <div class="flex justify-between">
            <div>
                <p class="font-bold ">GL Stock In Summary {{ formattedRange }}</p>
            </div>
            <div class="flex gap-2">


                <BaseButton label="Export" type="primary" :icon="DocumentPdf" @click="exportJsonToPdf(props.matrix)" />
                <BaseButton label="Refresh" :icon="RefreshRound" />
                <n-date-picker :value="range" type="daterange" clearable
                    @update:value="(val: any) => emit('update:dateRange', val)" />
            </div>
        </div>
        <div class="flex gap-10">
            <div class="flex-2">
                <VChart :option="props.chart" autoresize style="height: 380px; width: 100%;" />
            </div>
            <div>
                <n-scrollbar style="max-height: 380px" trigger="none">
                    <GlsColorTable :data="props.matrix.colors" />
                </n-scrollbar>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";
import GlsColorTable from '@/modules/gls/components/GlsColorTable.vue';
import type { matrixGlSummary } from "@/modules/gls/schemas/gls.matrix.schema";
import { DocumentPdf } from "@vicons/carbon";
import { RefreshRound } from '@vicons/material';
import dayjs from "dayjs";
import { jsPDF } from "jspdf";
import autoTable, { type RowInput } from "jspdf-autotable";
import { computed, ref, watch } from 'vue';

interface Props {
    chart: any,
    matrix: matrixGlSummary,
    startDate: string | undefined,
    endDate: string | undefined
}
const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits<{
    (e: 'update:dateRange', value: [number, number] | null): void
}>()


const range = ref<[number, number]>([0, 0])

watch(
    () => [props.startDate, props.endDate],
    ([start, end]) => {
        if (start && end) {
            range.value = [
                dayjs(start).valueOf(),
                dayjs(end).valueOf()
            ];
        }
    },
    { immediate: true } // supaya tetap jalan kalau props sudah ada sejak awal
);
const formattedRange = computed(() => {
    const [start, end] = range.value;
    if (!start || !end) return ""; // hindari Jan 1970
    return `${dayjs(start).format("MMM DD")} - ${dayjs(end).format("MMM DD, YYYY")}`;
});



const exportJsonToPdf = (data: matrixGlSummary | undefined) => {
    if (!data) return;

    const doc = new jsPDF("landscape", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();

    // 🧾 Header
    doc.setFontSize(12);
    doc.text("PT. Ghim Li Indonesia", 14, 18);
    doc.setFontSize(14);
    doc.text("Stock In Summary", pageWidth / 2, 12, { align: "center" });
    doc.setFontSize(12);
    doc.text(`${data.glNo}`, pageWidth / 2, 18, { align: "center" });
    doc.setFontSize(9);
    doc.text(`Print Date: ${formattedRange.value}`, pageWidth - 14, 18, { align: "right" });

    let currentY = 34;

    // 📘 Loop setiap warna
    data.colors.forEach((colorItem, idx) => {
        // 🟦 Judul warna
        doc.setFontSize(11);
        doc.text(`Color: ${colorItem.color}`, 14, currentY);
        currentY += 2;

        // 🧱 Header tabel
        const sizeHead: RowInput[] = [["Size", "Total Pcs", "Total Bundle"]];

        // 🧩 Body tabel (size + baris total)
        const sizeBody: RowInput[] = [
            ...colorItem.sizes.map((s) => [
                s.size,
                s.totalPcs,
                s.totalBundle,
            ]),
            // Baris Grand Total
            [
                {
                    content: `Grand Total`,
                    styles: { halign: "left", fontStyle: "bold", fillColor: [245, 245, 245] },
                },
                {
                    content: `${colorItem.totalPcs}`,
                    styles: { halign: "center", fontStyle: "bold", fillColor: [245, 245, 245] },
                },
                {
                    content: `${colorItem.totalPcs}`,
                    styles: { halign: "center", fontStyle: "bold", fillColor: [245, 245, 245] },
                },
            ],
        ];

        autoTable(doc, {
            startY: currentY,
            head: sizeHead,
            body: sizeBody,
            theme: "grid",
            styles: {
                fontSize: 9,
                halign: "center",
                valign: "middle",
                cellPadding: 2,
                lineWidth: 0.1,
            },
            headStyles: {
                fillColor: [240, 240, 240],
                textColor: [0, 0, 0],
                fontStyle: "bold",
            },
            margin: { left: 14, right: 14 },
        });

        const finalY = (doc as any).lastAutoTable.finalY;
        currentY = finalY + 10;

        // page break otomatis
        if (currentY > 180 && idx < data.colors.length - 1) {
            doc.addPage();
            currentY = 20;
        }
    });

    doc.save(`Sewing_GL_${data.glNo}_report.pdf`);
};

</script>