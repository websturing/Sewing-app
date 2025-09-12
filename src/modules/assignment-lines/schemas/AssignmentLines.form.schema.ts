import { z } from "zod"

export const AssignmentLinesFormSchema = z.object({
    glId: z.number().min(1, 'GL is required'),
    glNumber: z.string().min(1, 'GL Number is required'),
    lineId: z.number().min(1, 'Line is required'),
    dateStart: z.string(),
    dateEnd: z.string(),
    layingPlanning: z.object({
        id: z.number().optional(),
        color: z.string().min(1, 'Color is required'),
        type: z.enum(['BODY', 'COMBINASI']),
        summary: z.object({
            orderQty: z.number().int().nonnegative(),
            cutQty: z.number().int().nonnegative(),
        }),
    }),
    dateRange: z.array(z.string()).length(2, 'Date range must have exactly two dates'),
})

export type AssignmentLinesForm = z.infer<typeof AssignmentLinesFormSchema>