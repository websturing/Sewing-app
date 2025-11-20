import { z } from "zod";


export const defectItemSchema = z.object({
    glNo: z.string(),
    color: z.string(),
    size: z.string(),
    lineId: z.number(),
    lineName: z.string(),
    totalDefect: z.number(),
    totalPcs: z.number()

});

export const defectGroupLineSchema = z.object({
    lineName: z.string(),
    totalSize: z.number(),
    totalDefect: z.number(),
    items: z.array(defectItemSchema)
});

export const defectSummaryGroupLinesItemSchema = z.object({
    totalLines: z.number(),
    totalDefect: z.number(),
    lines: z.array(defectGroupLineSchema)
});

export const defectSummaryGroupLineResponse = z.object({
    status: z.boolean(),
    message: z.string(),
    data: defectSummaryGroupLinesItemSchema
})

export type DefectItem = z.infer<typeof defectItemSchema>
export type DefectGroupLine = z.infer<typeof defectGroupLineSchema>
export type DefectSummaryGroupLine = z.infer<typeof defectSummaryGroupLinesItemSchema>