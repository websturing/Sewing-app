import { LinksSchema, MetaSchema } from "@/types/metaPagination";
import { z } from 'zod';

const EmployeeSchema = z.object({
    id: z.number(),
    userId: z.number().nullable().optional(),
    employeeCode: z.string(),
    position: z.string(),
    department: z.string(),
    joinDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "join_date must be in YYYY-MM-DD format"
    }),
    active: z.boolean(),
    device_id: z.string().nullable().optional(),
    createdAt: z.string(),
    updatedAt: z.string()
})
export const EmployeesSchema = z.array(EmployeeSchema)
export const EmployeeResponseSchema = z.object({
    message: z.string(),
    data: z.array(EmployeeSchema),
    links: LinksSchema,
    meta: MetaSchema,
    status: z.boolean()
})



export type Employee = z.infer<typeof EmployeeSchema>
export type Employees = z.infer<typeof EmployeesSchema>
export type EmployeeResponseSchema = z.infer<typeof EmployeeResponseSchema>
export type EmployeeQuery = {
    page?: number
    q?: string
    perPage?: number
}