import { EmployeeSchema } from "@/modules/employee/schemas/employeeSchema";
import { LinksSchema, MetaSchema } from "@/types/metaPagination";
import { z } from "zod";

export const RolesSchema = z.object({
    name: z.string(),
    color: z.string()
})

export const UserSchema = z.object({
    id: z.number().optional(),
    email: z.string().email("Invalid email format").nonempty("Email is required"),
    name: z.string(),
    employee: EmployeeSchema.nullable(),
    roleNames: z.array(RolesSchema).nullable()
})

export const Users = z.array(UserSchema)

export const UserResponseSchema = z.object({
    message: z.string(),
    data: z.array(UserSchema),
    links: LinksSchema,
    meta: MetaSchema,
    status: z.boolean()
})

export type Roles = z.infer<typeof RolesSchema>
export type User = z.infer<typeof UserSchema>
export type Users = z.infer<typeof Users>
export type UserResponse = z.infer<typeof UserResponseSchema>