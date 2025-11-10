import { LinksSchema, MetaSchema } from "@/types/metaPagination";
import { z } from 'zod';

export const EmployeeSchema = z.object({
    id: z.number().optional(),
    userId: z.number().nullable().optional(),
    name: z.string().min(1, "Employee Name is required").nullable(),
    gender: z.enum(['male', 'female']).nullable(),
    employeeCode: z.string().min(1, "Employee Code is required."),
    position: z.string().min(1, "Position is required."),
    department: z.string().min(1, "Department is required."),
    dateBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "join_date must be in YYYY-MM-DD format"
    }).nullable(),
    joinDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "join_date must be in YYYY-MM-DD format"
    }),
    active: z.boolean(),
    device_id: z.string().nullable().optional(),
    createdAt: z.string().nullable().optional(),
    updatedAt: z.string().nullable().optional()
})

export const EmployeeLastCodeSchema = z.string().min(1, "Employee Code is required.")
export const EmployeesSchema = z.array(EmployeeSchema)
export const EmployeeResponseLastCodeSchema = z.object({
    message: z.string(),
    data: z.string(),
    status: z.boolean()
})
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
export type EmployeeResponseLastCode = z.infer<typeof EmployeeResponseLastCodeSchema>
export type EmployeeQuery = {
    page?: number
    q?: string
    perPage?: number,
    dateFrom?: string,
    dateTo?: string
}