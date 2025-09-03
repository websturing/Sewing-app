import { z } from "zod"

export const UserSchema = z.object({
    id: z.number().optional(),
    email: z.string().email("Invalid email format").nonempty("Email is required"),
    name: z.string(),
    roleNames: z.array(z.string()).nullable()
})

export type User = z.infer<typeof UserSchema>
