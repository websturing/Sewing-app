import { z } from "zod";

// Laying Planning Schema
export const LayingPlanningApiSchema = z.object({
    id: z.number(),
    assignmentLineId: z.number(),
    color: z.string(),
    type: z.string(),
    orderQty: z.number(),
    cutQty: z.number(),
    createdAt: z.string().datetime({ offset: true }), // ISO datetime
    updatedAt: z.string().datetime({ offset: true }),
});

// Assignment Schema
export const AssignmentApiSchema = z.object({
    id: z.number(),
    userId: z.number(),
    lineId: z.number(),
    glId: z.number(),
    isActive: z.number(),
    dateStart: z.string().date(),   // format "YYYY-MM-DD"
    dateEnd: z.string().date(),
    startedAt: z.string().nullable(),
    completedAt: z.string().nullable(),
    layingPlanning: z.array(LayingPlanningApiSchema),
    line: z.string(),
    glnumber: z.string(),
});

// Line Schema
export const LineAssignmentApiSchema = z.object({
    id: z.number(),
    name: z.string(),
    location: z.string(),
    glNumber: z.array(z.string()),
    colors: z.array(z.string()),
    // assignment: z.array(AssignmentApiSchema),
});

export const LineAssignmentResponseAPiSchema = z.object({
    status: z.boolean(),
    message: z.string(),
    data: z.array(LineAssignmentApiSchema)
})

// --- contoh parse
/*
const parsed = LineSchema.parse(apiResponse);
*/

export type LineAssignmentApi = z.infer<typeof LineAssignmentApiSchema>