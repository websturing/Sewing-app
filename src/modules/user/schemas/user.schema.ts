import { LinksSchema, MetaSchema } from "@/types/metaPagination";
import { z } from "zod";

export const UserSchema = z.object({
    id: z.number().optional(),
    email: z.string().email("Invalid email format").nonempty("Email is required"),
    name: z.string(),
    roleNames: z.array(z.string()).nullable()
})

export const Users = z.array(UserSchema)

export const UserResponseSchema = z.object({
    message: z.string(),
    data: z.array(UserSchema),
    links: LinksSchema,
    meta: MetaSchema,
    status: z.boolean()
})


export type User = z.infer<typeof UserSchema>
export type Users = z.infer<typeof Users>
export type UserResponse = z.infer<typeof UserResponseSchema>