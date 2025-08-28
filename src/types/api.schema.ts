import z from "zod"

export const ApiResponseSchema = z.object({
    success: z.boolean(),
    message: z.string()
})