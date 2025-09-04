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
    name: z.string().min(1, 'Name is required'),
    roleNames: z.array(z.string()).min(1, "Role is required")
})

export const UserApiSchema = z.object({
    id: z.number().optional(),
    email: z.string().email("Invalid email format").nonempty("Email is required"),
    name: z.string().min(1, 'Name is required'),
    employee: EmployeeSchema.nullable().optional(),
    roleNames: z.array(RolesSchema).nullable()
})

export const Users = z.array(UserSchema)

export const UserResponseSchema = z.object({
    message: z.string(),
    data: z.array(UserApiSchema),
    links: LinksSchema,
    meta: MetaSchema,
    status: z.boolean()
})

export type Roles = z.infer<typeof RolesSchema>
export type User = z.infer<typeof UserSchema>
export type Users = z.infer<typeof Users>
export type UserResponse = z.infer<typeof UserResponseSchema>