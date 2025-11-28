import { LinksSchema, MetaSchema } from "@/types/metaPagination";
import { z } from "zod";

export const ReplacementDefectListSchema = z.object({
    color: z.string(),
    layingPlanningId: z.number(),
    totalDefect: z.number(),
    sizeList: z.array(z.object({
        size: z.string(),
        defectQty: z.number()
    }))
});

export const ReplacementItemSchema = z.object({
    serialNumber: z.string().nullable().optional(),
    glNo: z.string().nullable().optional(),
    lineNames: z.array(z.string()),
    defectTotal: z.number(),
    defectList: z.array(ReplacementDefectListSchema),
    createdAt: z.string(),
    updatedAt: z.string(),
    isApproval: z.boolean()
})

export const ReplacementPaginationResponseSchema = z.object({
    status: z.boolean(),
    message: z.string(),
    links: LinksSchema,
    meta: MetaSchema,
    data: z.array(ReplacementItemSchema)
})

export type ReplacementItem = z.infer<typeof ReplacementItemSchema>
export type ReplacementItemDefectList = z.infer<typeof ReplacementDefectListSchema>




