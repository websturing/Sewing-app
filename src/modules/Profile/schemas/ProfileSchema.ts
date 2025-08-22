import { z } from "zod";

const PasswordBaseSchema = z.object({
    password: z.string()
        .min(8, "Password must be at least 8 characters")
})

export const PasswordChangeSchema = PasswordBaseSchema.extend({
    passwordConfirm: z.string().min(8, "Confirm Password must be at least 8 characters")
}).refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"]
});

export type PasswordChange = z.infer<typeof PasswordChangeSchema>
