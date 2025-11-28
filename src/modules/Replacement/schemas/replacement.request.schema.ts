import { z } from "zod";

export const ReplacementPaginationRequestSchema = z.object({
    perPage: z.number().nullable().optional(),
    page: z.number().nullable().optional(),
    search: z.string().nullable().optional()
})

export type ReplacementPaginationRequest = z.infer<typeof ReplacementPaginationRequestSchema>