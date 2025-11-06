import { z } from "zod";

export const lineFilterRequestSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, 'Line name is required'),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional()
})

export type lineFilterRequest = z.infer<typeof lineFilterRequestSchema>