import { z } from "zod";

export const ReplacementPaginationRequestSchema = z.object({
    perPage: z.number().nullable().optional(),
    page: z.number().nullable().optional(),
    search: z.string().nullable().optional()
})

export const ReplacementApprovalRequestSchema = z.object({
    replacementRequestId: z.number().optional(),
    note: z.string().nullable(),
    action: z.string()
})

export type ReplacementPaginationRequest = z.infer<typeof ReplacementPaginationRequestSchema>
export type ReplacementApprovalRequest = z.infer<typeof ReplacementApprovalRequestSchema>