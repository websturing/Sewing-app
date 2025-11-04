import { z } from 'zod';

// Schema untuk item data individual
export const matrixItemSchema = z.object({
    glNo: z.string(),
    date: z.string(), // atau z.date() jika ingin di-parse sebagai Date
    size: z.string(),
    totalBundle: z.number(),
    totalPcs: z.union([z.string(), z.number()]), // karena ada string dan number
    lineNames: z.string(),
    totalColors: z.number()
});

// Schema untuk summary per size
export const matrixSizeSummarySchema = z.object({
    size: z.string(),
    totalPcs: z.number(),
    totalBundle: z.number(),
});

export const matrixSummaryColorSchema = z.object({
    color: z.string(),
    totalPcs: z.number(),
    totalBundle: z.number(),
    totalSizes: z.number(),
    sizes: z.array(matrixSizeSummarySchema)
});

// Schema untuk summary GL
export const matrixGlSummarySchema = z.object({
    glNo: z.string(),
    sizes: z.array(matrixSizeSummarySchema),
    colors: z.array(matrixSummaryColorSchema)
});





// Main response schema
export const matrixResponseSchema = z.object({
    status: z.boolean(),
    message: z.string(),
    glNo: z.string(),
    hasRecentData: z.boolean(),
    startDate: z.string(),
    endDate: z.string(),
    count: z.number(),
    data: z.array(matrixItemSchema),
    summary: matrixGlSummarySchema
});

// Type inference untuk TypeScript
export type matrixResponse = z.infer<typeof matrixResponseSchema>;
export type matrixItem = z.infer<typeof matrixItemSchema>;
export type matrixSizeSummary = z.infer<typeof matrixSizeSummarySchema>;
export type matrixGlSummary = z.infer<typeof matrixGlSummarySchema>;
export type matrixSummaryColor = z.infer<typeof matrixSummaryColorSchema>;