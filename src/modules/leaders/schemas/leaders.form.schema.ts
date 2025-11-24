import { z } from "zod";

export const AssignLeaderFormSchema = z.object({
    userId: z.number().nullable().refine(v => v !== null, "Leader is required").transform(v => v as number),
    lineId: z.array(z.number()).min(1, "Leader is required"),
    isActive: z.boolean(),
});



export type AssignLeaderForm = z.infer<typeof AssignLeaderFormSchema>