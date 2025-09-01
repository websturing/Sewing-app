import { z } from "zod";

// Schema validation untuk meta
const MetaHeadSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
});

// Type inference dari Zod schema
export type MetaHead = z.infer<typeof MetaHeadSchema>;
