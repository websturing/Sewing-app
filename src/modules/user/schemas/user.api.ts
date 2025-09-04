import { EmployeeSchema } from "@/modules/employee/schemas/employeeSchema";
import { LinksSchema, MetaSchema } from "@/types/metaPagination";
import { z } from "zod";

export const RolesSchema = z.object({
    name: z.string(),
    color: z.string()
})



export const UserApiSchema = z.object({
    id: z.number().optional(),
    email: z.string().email("Invalid email format").nonempty("Email is required"),
    name: z.string().min(1, 'Name is required'),
    employee: EmployeeSchema.nullable().optional(),
    roleNames: z.array(RolesSchema).nullable()
})

export const UsersApiSchema = z.array(UserApiSchema)

export const UserResponseSchema = z.object({
    message: z.string(),
    data: z.array(UserApiSchema),
    links: LinksSchema,
    meta: MetaSchema,
    status: z.boolean()
})

export type Roles = z.infer<typeof RolesSchema>
export type UsersAPI = z.infer<typeof UsersApiSchema>
export type UserAPI = z.infer<typeof UserApiSchema>
export type UserResponse = z.infer<typeof UserResponseSchema>