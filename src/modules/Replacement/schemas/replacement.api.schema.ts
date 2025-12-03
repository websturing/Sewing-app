import { WorkFlowStepCurrentSchema } from "@/modules/Workflow/schemas/Workflow.api.schema";
import { LinksSchema, MetaSchema } from "@/types/metaPagination";
import { z } from "zod";

export const ReplacementDefectListSchema = z.object({
    color: z.string(),
    layingPlanningId: z.number(),
    totalDefect: z.number(),
    totalSize: z.number(),
    sizeList: z.array(z.object({
        size: z.string(),
        defectQty: z.number()
    }))
});

export const ReplacementItemSchema = z.object({
    serialNumber: z.string().nullable().optional(),
    glNo: z.string().nullable().optional(),
    lineNames: z.array(z.string()),
    colors: z.string(),
    defectTotal: z.number(),
    defectList: z.array(ReplacementDefectListSchema),
    totalSize: z.number(),
    requestedBy: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    isApproval: z.boolean(),
    status: z.object({
        name: z.string(),
        type: z.string(),
    }),
    currentStep: z.number(),
    workflow: WorkFlowStepCurrentSchema.nullable().optional()
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




