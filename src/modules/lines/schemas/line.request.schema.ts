import { z } from "zod";

export const lineFilterRequestSchema = z.object({
    search: z.string().optional()
})

export type LineFilterRequest = z.infer<typeof lineFilterRequestSchema>