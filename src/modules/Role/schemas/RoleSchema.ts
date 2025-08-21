import { z } from "zod"

const RoleBaseSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, "Name is required."),
    guardName: z.string().default("web"),
})



export const RoleCreateSchema = RoleBaseSchema.pick({
    name: true,
    guardName: true,
}).extend({
    permissions: z.array(z.number()).min(1, "Please select at least one permission."),
})

export const RoleUpdateSchema = RoleBaseSchema.partial().extend({
    permissions: z.array(z.number()).optional(),
})


export type RoleCreate = z.infer<typeof RoleCreateSchema>
export type RoleUpdate = z.infer<typeof RoleUpdateSchema>
