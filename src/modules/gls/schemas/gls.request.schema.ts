import { z } from "zod";

export const GLMatrixRequestSchema = z.object({
    glNumber: z.string().min(1, 'Line name is required'),
    startDate: z.string().optional(),
    endDate: z.string().optional()
})


export type GLMatrixRequest = z.infer<typeof GLMatrixRequestSchema>


export const GLCompletionReportRequestSchema = z.object({
    glNumber: z.string().min(1, 'GL Number Required'),
    color: z.string(),
    startDate: z.string().nullable().optional(),
    endDate: z.string().nullable().optional()
})
export type GLCompletionReportRequest = z.infer<typeof GLCompletionReportRequestSchema>