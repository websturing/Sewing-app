import { z } from 'zod';


export const StockInSummaryLinesChartRequestSchema = z.object({
    filters: z.object({
        startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
        endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional()
    }).optional()
});


export const StockInSummaryLinesChartSchema = z.object({
    id: z.number(),
    name: z.string(),
    location: z.string().nullable(),
    stockinCount: z.object({
        bundle: z.number(),
        pcs: z.number(),
    })
});

export const StockInSummaryLinesChartResponseSchema = z.object({
    status: z.boolean(),
    data: z.array(StockInSummaryLinesChartSchema),
    message: z.string(),
});

export type StockInSummaryLinesChart = z.infer<typeof StockInSummaryLinesChartSchema>;
export type StockInSummaryLinesChartRequest = z.infer<typeof StockInSummaryLinesChartRequestSchema>;