import { z } from "zod";

export const GLMatrixRequestSchema = z.object({
    glNumber: z.string().min(1, 'Line name is required'),
    startDate: z.string().optional(),
    endDate: z.string().optional()
})


export type GLMatrixRequest = z.infer<typeof GLMatrixRequestSchema>