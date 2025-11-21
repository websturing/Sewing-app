import { z } from "zod";

export const assignLeaderRequestSchema = z.object({
    userId: z.number(),
    lineId: z.number()
});

export const unassignLeaderRequestSchema = z.object({
    id: z.number()
});

// Types
export type AssignLeaderRequest = z.infer<typeof assignLeaderRequestSchema>;
export type UnassignLeaderRequest = z.infer<typeof unassignLeaderRequestSchema>;