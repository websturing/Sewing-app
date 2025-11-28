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
    serialNumber: z.number().nullable().optional(),
    glNo: z.number().nullable().optional(),
    lineName: z.array(z.string()),
    defectList: z.array(ReplacementDefectListSchema),
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
export type ReplacementDefectList = z.infer<typeof ReplacementDefectListSchema>




