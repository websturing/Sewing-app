import { z } from "zod";

export const WorkFlowStepCurrentSchema = z.object({
    current: z.string().nullable(),
    previous: z.string().nullable(),
    next: z.string().nullable(),

});

export type WorkFlowStepCurrent = z.infer<typeof WorkFlowStepCurrentSchema>