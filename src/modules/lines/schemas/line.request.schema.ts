import { z } from "zod";

export const lineFilterRequestSchema = z.object({
    search: z.string().optional(),
    page: z.number().min(1).optional(),
    perPage: z.number().min(1).max(100).optional(),
})

export type LineFilterRequest = z.infer<typeof lineFilterRequestSchema>