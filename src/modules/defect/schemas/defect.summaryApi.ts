import { z } from "zod";

// Defect item
export const defectItemSchema = z.object({
    glNo: z.string(),
    color: z.string(),
    size: z.string(),
    lineId: z.number(),
    lineName: z.string(),
    totalDefect: z.number(),
    totalPcs: z.number(),
});

// Shared base for grouping schemas
const defectGroupBaseSchema = z.object({
    totalSize: z.number(),
    totalDefect: z.number(),
    totalPcs: z.number(),
    items: z.array(defectItemSchema),
});

// Group by Line
export const defectGroupLineSchema = defectGroupBaseSchema.extend({
    lineName: z.string(),
});

// Group by GL Number
export const defectGroupGlNumberSchema = defectGroupBaseSchema.extend({
    glNumber: z.string(),
    color: z.string(),
    lineNames: z.string(),
});

// Summary
export const defectSummaryGroupLinesItemSchema = z.object({
    totalLines: z.number(),
    totalDefect: z.number(),
    lines: z.array(defectGroupLineSchema),
});

// Reusable API Response
const apiResponse = <T extends z.ZodTypeAny>(schema: T) =>
    z.object({
        status: z.boolean(),
        message: z.string(),
        data: schema,
    });

// Response Schemas
export const defectSummaryGroupLineResponse =
    apiResponse(defectSummaryGroupLinesItemSchema);

export const defectGroupLineResponseSchema =
    apiResponse(z.array(defectGroupLineSchema));

export const defectGroupGlNumberResponseSchema =
    apiResponse(z.array(defectGroupGlNumberSchema));

// Types
export type DefectItem = z.infer<typeof defectItemSchema>;
export type DefectGroupLine = z.infer<typeof defectGroupLineSchema>;
export type DefectGroupGlNumber = z.infer<typeof defectGroupGlNumberSchema>;
export type DefectSummaryGroupLine = z.infer<
    typeof defectSummaryGroupLinesItemSchema
>;
