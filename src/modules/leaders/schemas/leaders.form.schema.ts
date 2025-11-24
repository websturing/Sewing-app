import { z } from "zod";

export const AssignLeaderFormSchema = z.object({
    userId: z.number().min(1, "Leader is required"),
});

export type AssignLeaderForm = z.infer<typeof AssignLeaderFormSchema>