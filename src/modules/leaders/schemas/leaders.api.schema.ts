import { apiResponse } from "@/modules/defect/schemas/defect.summaryApi";
import { z } from "zod";


export const AssignmentLineDetailSchema = z.object({
    assignAt: z.string(),
    unassignAt: z.string().nullable(),
    lineId: z.number().nullable(),
    lineName: z.string().nullable(),
    createdBy: z.string(),
    updatedBy: z.string().nullable(),
    lastUpdated: z.string(),
});

export const AssignmentSummaryByLeaderSchema = z.object({
    leader: z.string(),
    leaderId: z.number(),
    isActive: z.boolean(),
    activeLines: z.string(),
    activeLineIds: z.string(),
    lastUpdated: z.string().nullable(),
    activeDetail: z.array(AssignmentLineDetailSchema),
    inactiveDetail: z.array(AssignmentLineDetailSchema),
});

export const AssignmentSummaryByLeaderResponseSchema = apiResponse(z.array(AssignmentSummaryByLeaderSchema));


// Type inference-nya
export type AssignmentSummaryByLeader = z.infer<typeof AssignmentSummaryByLeaderSchema>;