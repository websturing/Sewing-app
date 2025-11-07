import { z } from "zod";

export const lineFilterRequestSchema = z.object({
    id: z.union([z.string(), z.number()]).optional(),
    search: z.string().optional(),
    page: z.number().min(1).optional(),
    perPage: z.number().min(1).max(100).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
})

export type LineFilterRequest = z.infer<typeof lineFilterRequestSchema>