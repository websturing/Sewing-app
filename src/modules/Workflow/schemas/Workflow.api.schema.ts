import { apiResponse } from "@/modules/defect/schemas/defect.summaryApi";
import { z } from "zod";

export const WorkFlowStepCurrentSchema = z.object({
    current: z.string().nullable(),
    previous: z.string().nullable(),
    next: z.string().nullable(),
    id: z.number()

});

export const WorkFlowStepsSchema = z.object({
    id: z.number(),
    name: z.string(),
    role: z.string(),
    step: z.number(),
    isFinal: z.boolean()
})

export const WorkFlowItemSchema = z.object({
    id: z.number(),
    name: z.string(),
});

export const WorkFlowWithStepsSchema = WorkFlowItemSchema.extend({
    steps: z.array(WorkFlowStepsSchema)
});

export const WorkFlowWithStepResponseSchema = apiResponse(WorkFlowWithStepsSchema);


export type WorkFlowStepCurrent = z.infer<typeof WorkFlowStepCurrentSchema>
export type WorkFlowItem = z.infer<typeof WorkFlowItemSchema>
export type WorkFlowWithSteps = z.infer<typeof WorkFlowWithStepsSchema>
export type WorkFlowSteps = z.infer<typeof WorkFlowStepsSchema>