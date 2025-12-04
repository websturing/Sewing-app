import { apiResponse } from "@/modules/defect/schemas/defect.summaryApi";
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

export const ReplacementNotesSchema = z.object({
    id: z.number(),
    createdBy: z.string(),
    note: z.string().nullable(),
    createdAt: z.string().nullable(),
    updatedAt: z.string().nullable()
});

export const ReplacementItemSchema = z.object({
    id: z.number().optional(),
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
    notes: z.array(ReplacementNotesSchema),
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

export const ReplacementHistoriesWorkflowSchema =
    z.object({
        workflowName: z.string(),
        createdBy: z.string(),
        stepOrder: z.number(),
        note: z.string().nullable(),
        role: z.string(),
        isFinal: z.boolean(),
        isApproved: z.boolean(),
        createdAt: z.string().nullable(),
        updatedAt: z.string().nullable()
    })

export const ReplacementHistoriesWorkflowResponseSchema = apiResponse(z.array(ReplacementHistoriesWorkflowSchema))


export type ReplacementItem = z.infer<typeof ReplacementItemSchema>
export type ReplacementItemDefectList = z.infer<typeof ReplacementDefectListSchema>
export type ReplacementHistoriesWorkflow = z.infer<typeof ReplacementHistoriesWorkflowSchema>




