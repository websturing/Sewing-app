import { z } from "zod";

export const LinksSchema = z.object({}).passthrough()
export const MetaSchema = z.object({
    currentPage: z.number(),
    from : z.number(),
    lastPage: z.number(),
    path : z.string(),
    perPage: z.number(),
    to : z.number(),
    total: z.number()
}).passthrough()

  export type Links = z.infer<typeof LinksSchema>
  export type Meta = z.infer<typeof MetaSchema>